package api_tpo_grupo4.app.dao;

import java.util.List;

import api_tpo_grupo4.app.entity.Reclamo;

public interface IReclamoDAO {
	public List<Reclamo> findAll();

	public Reclamo findById(int id);

	public void save(Reclamo reclamo);

	public void deleteById(int id);
}
