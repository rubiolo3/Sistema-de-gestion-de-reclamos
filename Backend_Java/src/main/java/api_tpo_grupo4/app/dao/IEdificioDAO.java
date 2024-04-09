package api_tpo_grupo4.app.dao;

import java.util.List;

import api_tpo_grupo4.app.entity.Edificio;

public interface IEdificioDAO {
	public List<Edificio> findAll();

	public Edificio findById(int id);

	public void save(Edificio edificio);

	public void deleteById(int id);
}
