package api_tpo_grupo4.app.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import api_tpo_grupo4.app.entity.Edificio;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class EdificioDAOImpl implements IEdificioDAO {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	@Transactional(readOnly = true)
	public List<Edificio> findAll() {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<Edificio> getQuery = currentSession.createQuery("from Edificio ", Edificio.class);
		List<Edificio> edificio = getQuery.getResultList();
		return edificio;
	}

	@Override
	@Transactional(readOnly = true)
	public Edificio findById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Edificio edificio = currentSession.get(Edificio.class, id);
		return edificio;
	}

	@Override
	@Transactional
	public void save(Edificio edificio) {
		Session currentSession = entityManager.unwrap(Session.class);
		currentSession.persist(edificio);

	}

	@Override
	@Transactional
	public void deleteById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Query theQuery = currentSession.createQuery("delete from Edificio where id=:idEdificio");
		theQuery.setParameter("idEdificio", id);
		theQuery.executeUpdate();

	}

}
