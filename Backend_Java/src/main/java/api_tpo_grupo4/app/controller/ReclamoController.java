package api_tpo_grupo4.app.controller;

import java.util.List;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;

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
import org.springframework.web.multipart.MultipartFile;

import api_tpo_grupo4.app.dto.ReclamoDTO;
import api_tpo_grupo4.app.entity.Edificio;
import api_tpo_grupo4.app.entity.Reclamo;
import api_tpo_grupo4.app.entity.Unidad;
import api_tpo_grupo4.app.entity.Usuario;
import api_tpo_grupo4.app.service.IReclamoService;
import api_tpo_grupo4.app.service.IUnidadService;
import api_tpo_grupo4.app.service.IUsuarioService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class ReclamoController {

	@Autowired
	private IReclamoService reclamoService;

	@Autowired
	private IUsuarioService usuarioService;

	@Autowired
	private IUnidadService unidadService;

	private ReclamoDTO convertirReclamoADTO(Reclamo reclamo) {
		ReclamoDTO dto = new ReclamoDTO();
		
		dto.setId(reclamo.getId());
		dto.setIdUsuario(reclamo.getUsuario().getId());
		dto.setIdEdificio(reclamo.getEdificio().getId());
		if(reclamo.getUnidad()!=null) {
			dto.setIdUnidad(reclamo.getUnidad().getId());
		}
		dto.setNotas(reclamo.getNotas());
		dto.setDescripcion(reclamo.getDescripcion());
		dto.setEstado(reclamo.getEstado());
		dto.setTipoReclamo(reclamo.getTipoReclamo());
		dto.setUbicacion(reclamo.getUbicacion());

		return dto;
	}

	private Reclamo convertirReclamoDTOAEntidad(ReclamoDTO dto) {
		Reclamo reclamo = new Reclamo();
		
		reclamo.setId(dto.getId());
		reclamo.setNotas(dto.getNotas());
		reclamo.setDescripcion(dto.getDescripcion());
		reclamo.setEstado(dto.getEstado());
		reclamo.setTipoReclamo(dto.getTipoReclamo());
		reclamo.setUbicacion(dto.getUbicacion());

		return reclamo;
	}

	@GetMapping({ "/reclamos", "" })
	public List<ReclamoDTO> findAll() {
		List<Reclamo> reclamos = reclamoService.findAll();
		List<ReclamoDTO> reclamosDTO = new ArrayList<>();

		for (Reclamo reclamo : reclamos) {
			ReclamoDTO reclamoDTO = (convertirReclamoADTO(reclamo));

			byte[] datosImagen = reclamo.getDatosImagen();
			if (datosImagen != null) {
				String imagenBase64 = Base64.getEncoder().encodeToString(datosImagen);
				reclamoDTO.setImagenBase64(imagenBase64);

			}
			reclamosDTO.add(reclamoDTO);
		}

		return reclamosDTO;
	}

	@GetMapping("/reclamo/{reclamoId}")
	public ResponseEntity<?> getReclamo(@PathVariable int reclamoId) {
		Reclamo reclamo = reclamoService.findById(reclamoId);

		if (reclamo == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		ReclamoDTO reclamoDTO = convertirReclamoADTO(reclamo);

		return new ResponseEntity<>(reclamoDTO, HttpStatus.OK);
	}

	@GetMapping("/reclamoParam")
	public ResponseEntity<?> getReclamoParam(@RequestParam("reclamoId") int reclamoId) {
		Reclamo reclamo = reclamoService.findById(reclamoId);

		if (reclamo == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		ReclamoDTO reclamoDTO = convertirReclamoADTO(reclamo);

		return new ResponseEntity<>(reclamoDTO, HttpStatus.OK);
	}

	@PostMapping("/reclamos")
	public ResponseEntity<ReclamoDTO> addReclamo(@RequestBody ReclamoDTO reclamoDTO) {

		int idUsuario = reclamoDTO.getIdUsuario();
		reclamoDTO.setIdUsuario(idUsuario);

		int idEdificio = reclamoDTO.getIdEdificio();
		reclamoDTO.setIdEdificio(idEdificio);

		int idUnidad = reclamoDTO.getIdUnidad();
		reclamoDTO.setIdUnidad(idUnidad);

		// Obtener el usuario que está creando el reclamo
		Usuario usuario = usuarioService.findById(idUsuario);

		// Obtener la unidad del reclamo
		Unidad unidad = unidadService.findById(idUnidad);

		// Obtener el edificio del usuario
		Edificio edificioUsuario = obtenerEdificioDeUsuario(usuario);
		

		if (!validarUnidadHabitada(unidad, usuario)) {
			return ResponseEntity.status(403).build();
		}

		// Si pasó la validación, crear el reclamo
		reclamoService.save(reclamoDTO);

		return new ResponseEntity<>(reclamoDTO, HttpStatus.CREATED);
	}

	// Funciones que utilizamos en el metodo de arriba
	private Edificio obtenerEdificioDeUsuario(Usuario usuario) {
		if (!usuario.getUnidades().isEmpty()) {
			return usuario.getUnidades().get(0).getEdificio();
		}
		return null;
	}

	private boolean validarUnidadHabitada(Unidad unidad, Usuario usuario) {
		if(unidad!=null) {
			if (unidad.getEstado() == Unidad.estado.habitada) {
				// Validar que el usuario sea el propietario
				if (usuario.getId() != unidad.getUsuarioPropietario().getId()) {
					return false;
				}
			}
			return true;
		}
		return true;

	}

	@PutMapping("/reclamos/imagen/{reclamoId}")
	public ResponseEntity<String> addReclamoImagen(@PathVariable int reclamoId,
			@RequestParam("archivo") MultipartFile archivo) {

		try {
			Reclamo reclamo = reclamoService.findById(reclamoId);
			if (reclamo == null) {
				return ResponseEntity.notFound().build();
			}

			// Actualiza la imagen en la entidad Reclamo
			reclamo.setDatosImagen(archivo.getBytes());
			reclamoService.updateImage(reclamoId, reclamo);

			return ResponseEntity.ok("Imagen subida correctamente");
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la imagen");
		}
	}

	@PutMapping("/reclamos/{reclamoId}")
	public ResponseEntity<?> updateReclamo(@PathVariable int reclamoId, @RequestBody ReclamoDTO reclamoDTO) {

		Reclamo reclamo = convertirReclamoDTOAEntidad(reclamoDTO);

		reclamoService.update(reclamoId, reclamo);

		return new ResponseEntity<>(reclamoDTO, HttpStatus.OK);
	}

	@DeleteMapping("reclamos/{reclamoId}")
	public ResponseEntity<String> deleteReclamo(@PathVariable int reclamoId) {

		reclamoService.deleteById(reclamoId);

		String mensaje = "Reclamo eliminado [reclamoId=" + reclamoId + "]";
		return new ResponseEntity<>(mensaje, HttpStatus.NO_CONTENT);
	}

}
