package api_tpo_grupo4.app.dto;

import java.util.Arrays;

import api_tpo_grupo4.app.entity.Edificio;
import api_tpo_grupo4.app.entity.Reclamo;
import api_tpo_grupo4.app.entity.Unidad;
import api_tpo_grupo4.app.entity.Usuario;

public class ReclamoDTO {
	private int id;
	private Reclamo.estado estado;
	private String ubicacion;
	private int idEdificio;
	private int idUnidad;
	private String tipoReclamo;
	private String descripcion;
	private String notas;
	private byte[] datosImagen;
	private String imagenBase64;
	private int idUsuario;

	public ReclamoDTO() {
		super();
		// TODO Auto-generated constructor stub
	}





	public ReclamoDTO(int id, api_tpo_grupo4.app.entity.Reclamo.estado estado, String ubicacion, int idEdificio,
			int idUnidad, String tipoReclamo, String descripcion, String notas, byte[] datosImagen, String imagenBase64,
			int idUsuario) {
		super();
		this.id = id;
		this.estado = estado;
		this.ubicacion = ubicacion;
		this.idEdificio = idEdificio;
		this.idUnidad = idUnidad;
		this.tipoReclamo = tipoReclamo;
		this.descripcion = descripcion;
		this.notas = notas;
		this.datosImagen = datosImagen;
		this.imagenBase64 = imagenBase64;
		this.idUsuario = idUsuario;
	}





	public String getNotas() {
	return notas;
}


public void setNotas(String notas) {
	this.notas = notas;
}


	public byte[] getDatosImagen() {
		return datosImagen;
	}

	public void setDatosImagen(byte[] datosImagen) {
		this.datosImagen = datosImagen;
	}

	public String getImagenBase64() {
		return imagenBase64;
	}

	public void setImagenBase64(String imagenBase64) {
		this.imagenBase64 = imagenBase64;
	}

	public Reclamo.estado getEstado() {
		return estado;
	}

	public void setEstado(Reclamo.estado estado) {
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

	public int getIdEdificio() {
		return idEdificio;
	}

	public void setIdEdificio(int idEdificio) {
		this.idEdificio = idEdificio;
	}

	public int getIdUnidad() {
		return idUnidad;
	}

	public void setIdUnidad(int idUnidad) {
		this.idUnidad = idUnidad;
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

	public int getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(int idUsuario) {
		this.idUsuario = idUsuario;
	}





	@Override
	public String toString() {
		return "ReclamoDTO [id=" + id + ", estado=" + estado + ", ubicacion=" + ubicacion + ", idEdificio=" + idEdificio
				+ ", idUnidad=" + idUnidad + ", tipoReclamo=" + tipoReclamo + ", descripcion=" + descripcion
				+ ", notas=" + notas + ", datosImagen=" + Arrays.toString(datosImagen) + ", imagenBase64="
				+ imagenBase64 + ", idUsuario=" + idUsuario + "]";
	}




}
