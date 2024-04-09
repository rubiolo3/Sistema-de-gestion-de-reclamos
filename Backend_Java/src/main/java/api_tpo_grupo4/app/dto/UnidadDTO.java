package api_tpo_grupo4.app.dto;

import java.util.List;

import api_tpo_grupo4.app.entity.Unidad;
import api_tpo_grupo4.app.entity.Usuario;

public class UnidadDTO {
	private int id;
	private int idEdificio;
	private int piso;
	private String departamento;
	private int idPropietario;
	private Unidad.estado estado;
//	private List<Usuario> inquilinos;

	public UnidadDTO(int id, int idEdificio, int piso, String departamento,
			api_tpo_grupo4.app.entity.Unidad.estado estado, int idPropietario) {
		super();
		this.id = id;
		this.idEdificio = idEdificio;
		this.piso = piso;
		this.departamento = departamento;
		this.estado = estado;
		this.idPropietario = idPropietario;
	}

	public UnidadDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public Unidad.estado getEstado() {
		return estado;
	}

	public void setEstado(Unidad.estado estado) {
		this.estado = estado;
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

	public int getIdPropietario() {
		return idPropietario;
	}
	
	public void setIdPropietario(int idPropietario) {
		this.idPropietario = idPropietario;
	}

	public int getPiso() {
		return piso;
	}

	public void setPiso(int piso) {
		this.piso = piso;
	}

	public String getDepartamento() {
		return departamento;
	}

	public void setDepartamento(String departamento) {
		this.departamento = departamento;
	}
/*
	public List <Usuario> getInquilinos() {
		return inquilinos;
	}

	public void setInquilinos(List<Usuario> inquilinos) {
		this.inquilinos = inquilinos;
	}
*/
	@Override
	public String toString() {
		return "UnidadDTO [id=" + id + ", idEdificio=" + idEdificio + ", piso=" + piso + ", departamento="
				+ departamento + ", estado=" + estado +", idPropietario=" + idPropietario + "]";
	}
}
