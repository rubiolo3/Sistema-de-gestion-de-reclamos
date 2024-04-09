package api_tpo_grupo4.app.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import api_tpo_grupo4.app.dao.IEdificioDAO;
import api_tpo_grupo4.app.dao.IUnidadDAO;
import api_tpo_grupo4.app.dao.IUsuarioDAO;
import api_tpo_grupo4.app.dto.UnidadDTO;
import api_tpo_grupo4.app.entity.Edificio;
import api_tpo_grupo4.app.entity.Unidad;
import api_tpo_grupo4.app.entity.Usuario;

@Service
public class UnidadServiceImpl implements IUnidadService {

	@Autowired
	private IUnidadDAO unidadDAO;
	@Autowired
	private IUsuarioDAO usuarioDAO;
	@Autowired
	private IEdificioDAO edificioDAO;

	private Unidad convertirUnidadDTOAEntidad(UnidadDTO dto) {
		Unidad unidad = new Unidad();

		unidad.setPiso(dto.getPiso());
		unidad.setDepartamento(dto.getDepartamento());
		unidad.setEstado(dto.getEstado());

		return unidad;
	}

	@Override
	public List<Unidad> findAll() {
		List<Unidad> unidades = unidadDAO.findAll();
		
		return unidades;
	}

	@Override
	public Unidad findById(int id) {
		Unidad unidad = unidadDAO.findById(id);
		
		return unidad;
	}

	@Override
	@Transactional
	public void save(UnidadDTO unidadDTO) {
		
		Unidad unidad = convertirUnidadDTOAEntidad(unidadDTO);
		Edificio edificio = edificioDAO.findById(unidadDTO.getIdEdificio());
		unidad.setEdificio(edificio);
		Usuario usuarioPropietario = usuarioDAO.findById(unidadDTO.getIdPropietario());
		unidad.setUsuarioPropietario(usuarioPropietario);
		unidadDAO.save(unidad);

	}

	@Override
	@Transactional
	public void update(int unidadId, Unidad unidad) {
		Unidad unidadExistente = unidadDAO.findById(unidadId);

		if (unidadExistente != null) {

			unidadExistente.setPiso(unidad.getPiso());
			unidadExistente.setDepartamento(unidad.getDepartamento());
			unidadExistente.setEstado(unidad.getEstado());

			unidadDAO.save(unidadExistente);
		}

	}

	@Override
	public void deleteById(int id) {
		unidadDAO.deleteById(id);

	}

}
