package api_tpo_grupo4.app.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import api_tpo_grupo4.app.entity.Reclamo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class ReclamoDAOImpl implements IReclamoDAO {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	@Transactional(readOnly = true)
	public List<Reclamo> findAll() {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<Reclamo> getQuery = currentSession.createQuery("from Reclamo ", Reclamo.class);
		List<Reclamo> reclamos = getQuery.getResultList();
		return reclamos;
	}

	@Override
	@Transactional(readOnly = true)
	public Reclamo findById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Reclamo reclamos = currentSession.get(Reclamo.class, id);

		return reclamos;
	}

	@Override
	@Transactional
	public void save(Reclamo reclamo) {
		Session currentSession = entityManager.unwrap(Session.class);
		currentSession.persist(reclamo);

	}

	@Override
	@Transactional
	public void deleteById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Query theQuery = currentSession.createQuery("delete from Reclamo where id=:idReclamo");
		theQuery.setParameter("idReclamo", id);
		theQuery.executeUpdate();

	}

}
