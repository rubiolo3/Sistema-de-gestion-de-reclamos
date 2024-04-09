package api_tpo_grupo4.app.service;

import java.util.List;

import api_tpo_grupo4.app.dto.UnidadDTO;
import api_tpo_grupo4.app.entity.Unidad;

public interface IUnidadService {
	public List<Unidad> findAll();

	public Unidad findById(int id);

	public void save(UnidadDTO unidadDTO);

	public void update(int unidadId, Unidad unidad);

	public void deleteById(int id);

}
