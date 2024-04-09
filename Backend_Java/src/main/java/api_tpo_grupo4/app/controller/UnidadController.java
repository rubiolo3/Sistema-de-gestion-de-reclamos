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

import api_tpo_grupo4.app.dto.UnidadDTO;
import api_tpo_grupo4.app.entity.Unidad;
import api_tpo_grupo4.app.entity.Usuario;
import api_tpo_grupo4.app.service.IUnidadService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class UnidadController {

	@Autowired
	private IUnidadService unidadService;

	private UnidadDTO convertirUnidadADTO(Unidad unidad) {
		UnidadDTO dto = new UnidadDTO();

//		dto.setInquilinos(unidad.getInquilinos());
		dto.setId(unidad.getId());
		dto.setIdEdificio(unidad.getEdificio().getId());
		dto.setIdPropietario(unidad.getUsuarioPropietario().getId());
		dto.setPiso(unidad.getPiso());
		dto.setDepartamento(unidad.getDepartamento());
		dto.setEstado(unidad.getEstado());

		return dto;
	}

	private Unidad convertirUnidadDTOAEntidad(UnidadDTO dto) {
		Unidad unidad = new Unidad();
		
		unidad.setId(dto.getId());
		unidad.setPiso(dto.getPiso());
		unidad.setDepartamento(dto.getDepartamento());
		unidad.setEstado(dto.getEstado());

		return unidad;
	}
	
	@GetMapping({ "/unidades", "" })
	public List<UnidadDTO> findAll() {
		List<Unidad> unidades = unidadService.findAll();
		  
		List<UnidadDTO> unidadesDTO = new ArrayList<>();
		for(Unidad u : unidades) {
			unidadesDTO.add(convertirUnidadADTO(u));
		}

		return unidadesDTO;
	}

	@GetMapping("/unidad/{unidadId}")
	public ResponseEntity<?> getUnidad(@PathVariable int unidadId) {
		Unidad unidad = unidadService.findById(unidadId);

		if(unidad == null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		UnidadDTO unidadDTO = convertirUnidadADTO(unidad);
		  
		return new ResponseEntity<>(unidadDTO, HttpStatus.OK);
	}

	@GetMapping("/unidadParam")
	public ResponseEntity<?> getUnidadParam(@RequestParam("unidadId") int unidadId) {
		Unidad unidad = unidadService.findById(unidadId);

		if(unidad == null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		UnidadDTO unidadDTO = convertirUnidadADTO(unidad);
		  
		return new ResponseEntity<>(unidadDTO, HttpStatus.OK);
	}

	@PostMapping("/unidades")
	public ResponseEntity<UnidadDTO> addUnidad(@RequestBody UnidadDTO unidadDTO) {
/*
		List <Usuario> inquilinos = unidadDTO.getInquilinos();
		unidadDTO.setInquilinos(inquilinos);
*/
		int idEdificio = unidadDTO.getIdEdificio();
		unidadDTO.setIdEdificio(idEdificio);

		unidadService.save(unidadDTO);

		return new ResponseEntity<>(unidadDTO, HttpStatus.CREATED);
	}

	@PutMapping("/unidades/{unidadId}") // actualizar una unidad
	public ResponseEntity<?> updateUnidad(@PathVariable int unidadId, @RequestBody UnidadDTO unidadDTO) {

		Unidad unidad = convertirUnidadDTOAEntidad(unidadDTO);

		unidadService.update(unidadId, unidad);
		  
		return new ResponseEntity<>(unidadDTO, HttpStatus.OK);
	}

	@DeleteMapping("unidades/{unidadId}")
	public ResponseEntity<String> deleteDueño(@PathVariable int unidadId) {

		unidadService.deleteById(unidadId);

		String mensaje = "Unidad eliminada [unidadId=" + unidadId + "]";
		return new ResponseEntity<>(mensaje, HttpStatus.NO_CONTENT);
	}

}
