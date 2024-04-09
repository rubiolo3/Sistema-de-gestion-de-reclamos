package api_tpo_grupo4.app.service;

import java.util.List;


import api_tpo_grupo4.app.entity.Edificio;

public interface IEdificioService {
	public List<Edificio> findAll();

	public Edificio findById(int id);

	public void save(Edificio edificio);

	public void update(int idEdificio, Edificio edificio);

	public void deleteById(int id);
}
