package api_tpo_grupo4.app.entity;

import java.util.Arrays;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@Entity
public class Reclamo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	public enum estado {
		nuevo, abierto, proceso, desestimado, anulado, terminado
	}
	@Enumerated(EnumType.STRING)
	private estado estado;


    private String ubicacion;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_Edificio")
	private Edificio edificio;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_Unidad")
	private Unidad unidad;

	private String tipoReclamo;
	private String descripcion;
	private String notas; 

	public String getNotas() {
		return notas;
	}

	public void setNotas(String notas) {
		this.notas = notas;
	}

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_Usuario")
	private Usuario usuario;

	@Lob
	@Column(columnDefinition = "LONGBLOB")
	private byte[] datosImagen;

	public Reclamo() {
		super();
		// TODO Auto-generated constructor stub
	}



	public Reclamo(int id, api_tpo_grupo4.app.entity.Reclamo.estado estado, String ubicacion, Edificio edificio,
			Unidad unidad, String tipoReclamo, String descripcion, String notas, Usuario usuario, byte[] datosImagen) {
		super();
		this.id = id;
		this.estado = estado;
		this.ubicacion = ubicacion;
		this.edificio = edificio;
		this.unidad = unidad;
		this.tipoReclamo = tipoReclamo;
		this.descripcion = descripcion;
		this.notas = notas;
		this.usuario = usuario;
		this.datosImagen = datosImagen;
	}

	public Reclamo(String tipoReclamo, String descripcion) {
		super();
		this.tipoReclamo = tipoReclamo;
		this.descripcion = descripcion;
	}

	public byte[] getDatosImagen() {
		return datosImagen;
	}

	public void setDatosImagen(byte[] datosImagen) {
		this.datosImagen = datosImagen;
	}

	public estado getEstado() {
		return estado;
	}

	public void setEstado(estado estado) {
		this.estado = estado;
	}

	public String getUbicacion() {
		return ubicacion;
	}

	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Edificio getEdificio() {
		return edificio;
	}

	public void setEdificio(Edificio edificio) {
		this.edificio = edificio;
	}

	public Unidad getUnidad() {
		return unidad;
	}

	public void setUnidad(Unidad unidad) {
		this.unidad = unidad;
	}

	public String getTipoReclamo() {
		return tipoReclamo;
	}

	public void setTipoReclamo(String tipoReclamo) {
		this.tipoReclamo = tipoReclamo;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	@Override
	public String toString() {
		return "Reclamo [id=" + id + ", estado=" + estado + ", ubicacion=" + ubicacion + ", edificio=" + edificio
				+ ", unidad=" + unidad + ", tipoReclamo=" + tipoReclamo + ", descripcion=" + descripcion + ", notas="
				+ notas + ", usuario=" + usuario + ", datosImagen=" + Arrays.toString(datosImagen) + "]";
	}




}
