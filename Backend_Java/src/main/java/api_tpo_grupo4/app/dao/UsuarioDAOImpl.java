package api_tpo_grupo4.app.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import api_tpo_grupo4.app.entity.Usuario;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class UsuarioDAOImpl implements IUsuarioDAO {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	@Transactional(readOnly = true)
	public List<Usuario> findAll() {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<Usuario> getQuery = currentSession.createQuery("from Usuario", Usuario.class);
		List<Usuario> usuarios = getQuery.getResultList();
		return usuarios;
	}

	@Override
	@Transactional(readOnly = true)
	public Usuario findById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Usuario usuarios = currentSession.get(Usuario.class, id);
		return usuarios;
	}

	@Override
	@Transactional
	public void save(Usuario usuario) {
		Session currentSession = entityManager.unwrap(Session.class);
		currentSession.persist(usuario);
	}

	@Override
	@Transactional
	public void deleteById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		// elimina el usuario q coincida con el id
		Query theQuery = currentSession.createQuery("delete from Usuario where id=:idUsuario");
		theQuery.setParameter("idUsuario", id);
		theQuery.executeUpdate();

	}

	@Override
	@Transactional(readOnly = true)
	public Usuario findUser(String usuario, String password) {
	    Session currentSession = entityManager.unwrap(Session.class);

	    // Log para verificar que las credenciales se están recibiendo correctamente
	    System.out.println("Usuario recibido: " + usuario);
	    System.out.println("Contraseña recibida: " + password);

	    Query<Usuario> theQuery = currentSession.createQuery("FROM Usuario WHERE usuario=:usuario", Usuario.class);
	    theQuery.setParameter("usuario", usuario);

	    Usuario user = theQuery.uniqueResult();

	    if (user != null) {
	        System.out.println("Contraseña en BD: " + user.getPassword());
	        boolean isPasswordMatch = checkPassword(password, user.getPassword());

	        if (isPasswordMatch) {
	            // Log de éxito de autenticación
	            System.out.println("Autenticación exitosa para el usuario: " + usuario);
	            return user;
	        } else {
	            // Log si la contraseña no coincide
	            System.out.println("La autenticación falló para el usuario (contraseña incorrecta): " + usuario);
	        }
	    } else {
	        // Log si el usuario no se encuentra en la BD
	        System.out.println("La autenticación falló para el usuario (usuario no encontrado): " + usuario);
	    }

	    return null;
	}

	private boolean checkPassword(String password, String passwordDB) {
	    if (password == null) {
	        // Log o manejo de error para contraseña nula
	        System.out.println("Contraseña nula recibida");
	        return false;
	    }

	    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	    String hashedPassword = passwordEncoder.encode(password);
	    System.out.println("Password: " + password);
	    System.out.println("hashedPassword: " + hashedPassword);
	    System.out.println("passwordDB: " + passwordDB);
	    boolean isPasswordMatch = passwordEncoder.matches(password, passwordDB);

	    return isPasswordMatch;
	}
}
