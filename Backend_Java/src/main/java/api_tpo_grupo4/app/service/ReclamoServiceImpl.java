package api_tpo_grupo4.app.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api_tpo_grupo4.app.dao.IEdificioDAO;
import api_tpo_grupo4.app.dao.IReclamoDAO;
import api_tpo_grupo4.app.dao.IUnidadDAO;
import api_tpo_grupo4.app.dao.IUsuarioDAO;
import api_tpo_grupo4.app.dto.ReclamoDTO;
import api_tpo_grupo4.app.entity.Edificio;
import api_tpo_grupo4.app.entity.Reclamo;
import api_tpo_grupo4.app.entity.Unidad;
import api_tpo_grupo4.app.entity.Usuario;

@Service
public class ReclamoServiceImpl implements IReclamoService {

	@Autowired
	private IReclamoDAO reclamoDAO;

	@Autowired
	private IUsuarioDAO usuarioDAO;

	@Autowired
	private IUnidadDAO unidadDAO;

	@Autowired
	private IEdificioDAO edificioDAO;


	private Reclamo convertirReclamoDTOAEntidad(ReclamoDTO dto) {
		Reclamo reclamo = new Reclamo();

		reclamo.setDescripcion(dto.getDescripcion());
		reclamo.setNotas(dto.getNotas());
		reclamo.setEstado(dto.getEstado());
		reclamo.setTipoReclamo(dto.getTipoReclamo());
		reclamo.setUbicacion(dto.getUbicacion());

		return reclamo;
	}
	
	@Override
	public List<Reclamo> findAll() {
		List<Reclamo> reclamos = reclamoDAO.findAll();

		return reclamos;
	}

	@Override
	public Reclamo findById(int id) {
		Reclamo reclamo = reclamoDAO.findById(id);

		return reclamo;
	}

	@Override
	public void save(ReclamoDTO reclamoDTO) {
		Reclamo reclamo = convertirReclamoDTOAEntidad(reclamoDTO);

		Usuario usuario = usuarioDAO.findById(reclamoDTO.getIdUsuario());

		Edificio edificio = edificioDAO.findById(reclamoDTO.getIdEdificio());

		Unidad unidad = unidadDAO.findById(reclamoDTO.getIdUnidad());


		reclamo.setUsuario(usuario);
		reclamo.setEdificio(edificio);
		reclamo.setUnidad(unidad);

		reclamoDAO.save(reclamo);
	}

	@Override
	public void update(int reclamoId, Reclamo reclamo) {
		Reclamo reclamoExistente = reclamoDAO.findById(reclamoId);

		if (reclamoExistente != null) {

			//reclamoExistente.setDescripcion(reclamo.getDescripcion());
			reclamoExistente.setNotas(reclamo.getNotas());
			reclamoExistente.setEstado(reclamo.getEstado());
			//reclamoExistente.setTipoReclamo(reclamo.getTipoReclamo());
			//reclamoExistente.setUbicacion(reclamo.getUbicacion());

			reclamoDAO.save(reclamoExistente);
		}
	}

	@Override
	public void deleteById(int id) {
		reclamoDAO.deleteById(id);
	}

	@Override
	public void updateImage(int reclamoId, Reclamo reclamo) {
		Reclamo reclamoExistente = reclamoDAO.findById(reclamoId);

		if (reclamoExistente != null) {
			reclamoExistente.setDatosImagen(reclamo.getDatosImagen());

			reclamoDAO.save(reclamoExistente);
		}
		
	}

}
