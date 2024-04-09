package api_tpo_grupo4.app.dto;

import api_tpo_grupo4.app.entity.Usuario;

public class UsuarioDTO {
	private int id;
	private String usuario;
	private String password;
	private String mail;
	private int dni;
	private String nombre;
	private String apellido;
	private Usuario.tipoUsuario tipoUsuario;
	private int idUnidadAlquilada;

	public UsuarioDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UsuarioDTO(int id, String usuario, String password, String mail, int dni, String nombre, String apellido,
			api_tpo_grupo4.app.entity.Usuario.tipoUsuario tipoUsuario, int idUnidadAlquilada) {
		super();
		this.id = id;
		this.usuario = usuario;
		this.password = password;
		this.mail = mail;
		this.dni = dni;
		this.nombre = nombre;
		this.apellido = apellido;
		this.tipoUsuario = tipoUsuario;
		this.idUnidadAlquilada = idUnidadAlquilada;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public Usuario.tipoUsuario getTipoUsuario() {
		return tipoUsuario;
	}

	public void setTipoUsuario(Usuario.tipoUsuario tipoUsuario) {
		this.tipoUsuario = tipoUsuario;
	}
	
	public int getIdUnidadAlquilada() {
		return idUnidadAlquilada;
	}

	public void setIdUnidadAlquilada(int idUnidadAlquilada) {
		this.idUnidadAlquilada = idUnidadAlquilada;
	}

	@Override
	public String toString() {
		return "UsuarioDTO [id=" + id + ", usuario=" + usuario + ", password=" + password + ", mail=" + mail + ", dni="
				+ dni + ", nombre=" + nombre + ", apellido=" + apellido + ", tipoUsuario=" + tipoUsuario + ", idUnidadAlquilada=" + idUnidadAlquilada + "]";
	}





}
