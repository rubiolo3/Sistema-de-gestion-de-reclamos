package api_tpo_grupo4.app.service;

import java.util.List;

import api_tpo_grupo4.app.dto.ReclamoDTO;
import api_tpo_grupo4.app.entity.Reclamo;

public interface IReclamoService {
	public List<Reclamo> findAll();

	public Reclamo findById(int id);

	public void save(ReclamoDTO reclamoDTO);

	public void update(int reclamoId, Reclamo reclamo);
	
	public void updateImage(int reclamoId, Reclamo reclamo);

	public void deleteById(int id);
}
