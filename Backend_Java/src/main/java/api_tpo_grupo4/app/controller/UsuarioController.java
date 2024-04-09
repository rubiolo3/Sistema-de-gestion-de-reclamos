package api_tpo_grupo4.app.controller;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import api_tpo_grupo4.app.dto.UsuarioDTO;
import api_tpo_grupo4.app.entity.Usuario;
import api_tpo_grupo4.app.service.IUsuarioService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class UsuarioController {

	@Autowired
	private IUsuarioService usuarioService;

	private UsuarioDTO convertirUsuarioADTO(Usuario usuario) {
		UsuarioDTO dto = new UsuarioDTO();
		
		dto.setId(usuario.getId());
		dto.setUsuario(usuario.getUsuario());
		dto.setPassword(usuario.getPassword());
		dto.setMail(usuario.getMail());
		dto.setDni(usuario.getDni());
		dto.setNombre(usuario.getNombre());
		dto.setApellido(usuario.getApellido());
		dto.setTipoUsuario(usuario.getTipousuario());
		dto.setIdUnidadAlquilada(usuario.getIdUnidadAlquilada());

		return dto;
	}

	private Usuario convertirUsuarioDTOAEntidad(UsuarioDTO dto) {
		Usuario usuario = new Usuario();

		usuario.setId(dto.getId());
		usuario.setUsuario(dto.getUsuario());
		usuario.setPassword(dto.getPassword());
		usuario.setMail(dto.getMail());
		usuario.setDni(dto.getDni());
		usuario.setNombre(dto.getNombre());
		usuario.setApellido(dto.getApellido());
		usuario.setTipousuario(dto.getTipoUsuario());
		usuario.setIdUnidadAlquilada(dto.getIdUnidadAlquilada());

		return usuario;
	}
	

	@GetMapping({ "/usuarios", "" })
	public List<UsuarioDTO> findAll() {

		List<Usuario> usuarios = usuarioService.findAll();
		  
		List<UsuarioDTO> usuariosDTO = new ArrayList<>();
		for(Usuario usuario : usuarios) {
			usuariosDTO.add(convertirUsuarioADTO(usuario)); 
		}
		  
		return usuariosDTO;
	}

	@GetMapping("/usuario/{usuarioId}")
	public ResponseEntity<?> getUsuario(@PathVariable int usuarioId) {
		Usuario usuario = usuarioService.findById(usuarioId);
		  
		if(usuario == null) {
		  return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
		}
		  
		UsuarioDTO usuarioDTO = convertirUsuarioADTO(usuario);
		  
		return new ResponseEntity<>(usuarioDTO, HttpStatus.OK);
	}

	@GetMapping("/usuarioParam")
	public ResponseEntity<?> getUsuarioParam(@RequestParam("usuarioId") int usuarioId) {
		Usuario usuario = usuarioService.findById(usuarioId);

		if(usuario == null) {
		  return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		UsuarioDTO usuarioDTO = convertirUsuarioADTO(usuario);
		  
		return new ResponseEntity<>(usuarioDTO, HttpStatus.OK);
	}

	@PostMapping("/usuarios")
	public ResponseEntity<UsuarioDTO> addUsuario(@RequestBody UsuarioDTO usuarioDTO) {
		Usuario usuario=convertirUsuarioDTOAEntidad(usuarioDTO);
		usuarioService.save(usuario);

		return new ResponseEntity<>(usuarioDTO, HttpStatus.CREATED);
	}

	@PutMapping("/usuarios/{usuarioId}") // actualizar un usuario
	public ResponseEntity<?> updateUsuario(@PathVariable int usuarioId, @RequestBody UsuarioDTO usuarioDTO) {

		Usuario usuario = convertirUsuarioDTOAEntidad(usuarioDTO);
		  
		usuarioService.update(usuarioId, usuario);
		  
		return new ResponseEntity<>(usuarioDTO, HttpStatus.OK);
		}

	@DeleteMapping("usuarios/{usuarioId}") // Delete un usuario
	public ResponseEntity<String> deleteUsuario(@PathVariable int usuarioId) {

		usuarioService.deleteById(usuarioId);

		String mensaje = "Usuario eliminado [usuarioId=" + usuarioId + "]";
		return new ResponseEntity<>(mensaje, HttpStatus.NO_CONTENT);
	}

}