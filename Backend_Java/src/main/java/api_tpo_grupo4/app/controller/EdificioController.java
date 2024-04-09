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

import api_tpo_grupo4.app.dto.EdificioDTO;
import api_tpo_grupo4.app.entity.Edificio;
import api_tpo_grupo4.app.service.IEdificioService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class EdificioController {

	@Autowired
	private IEdificioService edificioService;

	private EdificioDTO convertirEdificioADTO(Edificio edificio) {
		EdificioDTO dto = new EdificioDTO();

		dto.setId(edificio.getId());
		dto.setCalle(edificio.getCalle());
		dto.setCiudad(edificio.getCiudad());
		dto.setLocalidad(edificio.getLocalidad());

		return dto;
	}

	private Edificio convertirEdificioDTOAEntidad(EdificioDTO dto) {
		Edificio edificio = new Edificio();

		edificio.setId(dto.getId());
		edificio.setCalle(dto.getCalle());
		edificio.setCiudad(dto.getCiudad());
		edificio.setLocalidad(dto.getLocalidad());

		return edificio;
	}

	@GetMapping({ "/edificios", "" })
	public List<EdificioDTO> findAll() {
		List<Edificio> edificios = edificioService.findAll();

		List<EdificioDTO> edificiosDTO = new ArrayList<>();
		for (Edificio e : edificios) {
			edificiosDTO.add(convertirEdificioADTO(e));
		}

		return edificiosDTO;
	}

	@GetMapping("/edificio/{edificioId}")
	public ResponseEntity<?> getEdificio(@PathVariable int edificioId) {
		Edificio edificio = edificioService.findById(edificioId);

		if (edificio == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		EdificioDTO edificioDTO = convertirEdificioADTO(edificio);

		return new ResponseEntity<>(edificioDTO, HttpStatus.OK);

	}

	@GetMapping("/edificioParam")
	public ResponseEntity<?> getEdificioParam(@RequestParam("edificioId") int edificioId) {
		Edificio edificio = edificioService.findById(edificioId);

		if (edificio == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		EdificioDTO edificioDTO = convertirEdificioADTO(edificio);

		return new ResponseEntity<>(edificioDTO, HttpStatus.OK);
	}

	
	@PostMapping("/edificios")
	public ResponseEntity<EdificioDTO> addEdificio(@RequestBody EdificioDTO edificioDTO) {
		Edificio edificio = convertirEdificioDTOAEntidad(edificioDTO);

		int usuarioActivoTipo = 0;
		if (usuarioActivoTipo == 0) {
			edificioService.save(edificio);
		} else {
			throw new RuntimeException("Debe ser Administrador para crear Edificios");
		}

		return new ResponseEntity<>(edificioDTO, HttpStatus.CREATED);
	}

	@PutMapping("/edificios/{edificioId}")
	public ResponseEntity<?> updateEdificio(@PathVariable int edificioId, @RequestBody EdificioDTO edificioDTO) {

		Edificio edificio = convertirEdificioDTOAEntidad(edificioDTO);

		edificioService.update(edificioId, edificio);

		return new ResponseEntity<>(edificioDTO, HttpStatus.OK);
	}

	@DeleteMapping("edificios/{edificioId}")
	public ResponseEntity<String> deleteEdificio(@PathVariable int edificioId) {

		edificioService.deleteById(edificioId);

		String mensaje = "Edificio eliminado [edificioId=" + edificioId + "]";
		return new ResponseEntity<>(mensaje, HttpStatus.NO_CONTENT);
	}

}
