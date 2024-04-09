package api_tpo_grupo4.app.service;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api_tpo_grupo4.app.dao.IEdificioDAO;
import api_tpo_grupo4.app.dto.EdificioDTO;
import api_tpo_grupo4.app.entity.Edificio;

@Service
public class EdificioServiceImpl implements IEdificioService {

	@Autowired
	private IEdificioDAO edificioDAO;

	@Override
	public List<Edificio> findAll() {
		List<Edificio> edificios = edificioDAO.findAll();

		return edificios;
	}

	@Override
	public Edificio findById(int id) {
		Edificio edificio = edificioDAO.findById(id);
		return edificio;
	}

	@Override
	public void save(Edificio edificio) {
		edificioDAO.save(edificio);

	}

	@Override
	public void update(int idEdificio, Edificio edificio) {
		Edificio edificioExistente = edificioDAO.findById(idEdificio);

		if (edificioExistente != null) {
			edificioExistente.setCalle(edificio.getCalle());
			edificioExistente.setCiudad(edificio.getCiudad());
			edificioExistente.setLocalidad(edificio.getLocalidad());

			edificioDAO.save(edificioExistente);
		}

	}

	@Override
	public void deleteById(int id) {
		edificioDAO.deleteById(id);

	}

}
