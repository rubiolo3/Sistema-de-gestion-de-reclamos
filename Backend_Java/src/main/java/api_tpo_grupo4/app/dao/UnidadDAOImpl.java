package api_tpo_grupo4.app.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import api_tpo_grupo4.app.entity.Unidad;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class UnidadDAOImpl implements IUnidadDAO {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	@Transactional(readOnly = true)
	public List<Unidad> findAll() {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<Unidad> getQuery = currentSession.createQuery("from Unidad", Unidad.class);
		List<Unidad> unidades = getQuery.getResultList();
		return unidades;
	}

	@Override
	@Transactional(readOnly = true)
	public Unidad findById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Unidad unidades = currentSession.get(Unidad.class, id);

		return unidades;
	}

	@Override
	@Transactional
	public void save(Unidad unidad) {
		Session currentSession = entityManager.unwrap(Session.class);
		currentSession.persist(unidad);

	}

	@Override
	@Transactional
	public void deleteById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Query theQuery = currentSession.createQuery("delete from Unidad where id=:idUnidad");
		theQuery.setParameter("idUnidad", id);
		theQuery.executeUpdate();

	}

}
