package api_tpo_grupo4.app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import api_tpo_grupo4.app.dao.IUsuarioDAO;
import api_tpo_grupo4.app.dto.UsuarioDTO;
import api_tpo_grupo4.app.entity.Usuario;

@Service
public class UsuarioServiceImpl implements IUsuarioService {

	@Autowired
	private IUsuarioDAO usuarioDAO;

	@Override
	public List<Usuario> findAll() {
		List<Usuario> usuarios = usuarioDAO.findAll();

		return usuarios;
	}

	@Override
	public Usuario findById(int id) {
		Usuario user = usuarioDAO.findById(id);
		return user;
	}

	@Override
	public void save(Usuario usuario) {
	    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	    String hashedPassword = passwordEncoder.encode(usuario.getPassword());
	    usuario.setPassword(hashedPassword);
		usuarioDAO.save(usuario);
	}

	@Override
	public void update(int usuarioId, Usuario usuario) {
		Usuario usuarioExistente = usuarioDAO.findById(usuarioId); // buscamos el usuario x id en el DAO

		if (usuarioExistente != null) { // si el cliente existe

			usuarioExistente.setUsuario(usuario.getUsuario()); // le actualizamos los datos
		    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		    String hashedPassword = passwordEncoder.encode(usuario.getPassword());
		    usuarioExistente.setPassword(hashedPassword);
			usuarioExistente.setMail(usuario.getMail());
			usuarioExistente.setDni(usuario.getDni());
			usuarioExistente.setNombre(usuario.getNombre());
			usuarioExistente.setApellido(usuario.getApellido());
			usuarioExistente.setTipousuario(usuario.getTipousuario());

			usuarioDAO.save(usuarioExistente);
		}

	}

	@Override
	public void deleteById(int id) {
		usuarioDAO.deleteById(id);

	}

	@Override
	public Usuario findUser(String usuario, String password) {
		Usuario user = usuarioDAO.findUser(usuario, password);
		return user;
	}




}
