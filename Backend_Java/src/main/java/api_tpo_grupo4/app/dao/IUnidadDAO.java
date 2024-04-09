package api_tpo_grupo4.app.dao;

import java.util.List;

import api_tpo_grupo4.app.entity.Unidad;
import api_tpo_grupo4.app.entity.Usuario;

public interface IUnidadDAO {
	public List<Unidad> findAll();

	public Unidad findById(int id);

	public void save(Unidad unidad);

	public void deleteById(int id);

}
