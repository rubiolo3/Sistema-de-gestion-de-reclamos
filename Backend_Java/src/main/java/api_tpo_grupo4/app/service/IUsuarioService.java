package api_tpo_grupo4.app.service;

import java.util.List;

import api_tpo_grupo4.app.entity.Usuario;

public interface IUsuarioService {
	public List<Usuario> findAll();

	public Usuario findById(int id);

	public void save(Usuario usuario);

	public void update(int usuarioId, Usuario usuario);

	public void deleteById(int id);

	public Usuario findUser(String usuario, String password);

}
