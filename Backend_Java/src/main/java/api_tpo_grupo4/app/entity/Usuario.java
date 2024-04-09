package api_tpo_grupo4.app.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	public enum tipoUsuario {
		admin, inquilino, dueño
	}
	
	@Enumerated(EnumType.STRING)
	private tipoUsuario tipousuario;

	@Column(name = "Usuario", nullable = false)
	private String usuario;
	@Column(name = "Contraseña", nullable = false)
	private String password;

	private String mail;
	@Column(name = "Dni", nullable = false)
	private int dni;

	private String nombre;

	private String apellido;

	@OneToMany(mappedBy = "usuarioPropietario", cascade = CascadeType.ALL)
	private List<Unidad> unidades = new ArrayList<Unidad>();

	@OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
	private List<Reclamo> reclamos = new ArrayList<Reclamo>();

	private int idUnidadAlquilada;

	public List<Reclamo> getReclamos() {
		return reclamos;
	}

	public List<Unidad> getUnidades() {
		return unidades;
	}

	public void setReclamos(List<Reclamo> reclamos) {
		this.reclamos = reclamos;
	}

	public void setUnidades(List<Unidad> unidades) {
		this.unidades = unidades;
	}

	public Usuario() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Usuario(int id, tipoUsuario tipousuario, String usuario, String password, String mail, int dni,
			String nombre, String apellido, int idUnidadAlquilada, List<Reclamo> reclamos) {
		super();
		this.id = id;
		this.tipousuario = tipousuario;
		this.usuario = usuario;
		this.password = password;
		this.mail = mail;
		this.dni = dni;
		this.nombre = nombre;
		this.apellido = apellido;
		this.idUnidadAlquilada = idUnidadAlquilada;
		this.reclamos = reclamos;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public tipoUsuario getTipousuario() {
		return tipousuario;
	}

	public void setTipousuario(tipoUsuario tipousuario) {
		this.tipousuario = tipousuario;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public int getDni() {
		return dni;
	}

	public void setDni(int dni) {
		this.dni = dni;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}
	
	public int getIdUnidadAlquilada() {
		return idUnidadAlquilada;
	}

	public void setIdUnidadAlquilada(int idUnidadAlquilada) {
		this.idUnidadAlquilada = idUnidadAlquilada;
	}

	@Override
	public String toString() {
		return "Usuario [id=" + id + ", tipousuario=" + tipousuario + ", usuario=" + usuario + ", password=" + password
				+ ", mail=" + mail + ", dni=" + dni + ", nombre=" + nombre + ", apellido=" + apellido + ", idUnidadAlquilada="
				+ idUnidadAlquilada + ", reclamos=" + reclamos + "]";
	}



}