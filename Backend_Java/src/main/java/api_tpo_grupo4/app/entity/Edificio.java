package api_tpo_grupo4.app.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Edificio {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String ciudad;
	private String localidad;
	private String calle;

	@OneToMany(mappedBy = "edificio", cascade = CascadeType.ALL)
	private List<Reclamo> reclamos = new ArrayList<Reclamo>();

	@OneToMany(mappedBy = "edificio", cascade = CascadeType.ALL)
	private List<Unidad> unidades = new ArrayList<Unidad>();

	public Edificio() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Edificio(int id, String ciudad, String localidad, String calle, List<Reclamo> reclamos,
			List<Unidad> unidades) {
		super();
		this.id = id;
		this.ciudad = ciudad;
		this.localidad = localidad;
		this.calle = calle;
		this.reclamos = reclamos;
		this.unidades = unidades;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCiudad() {
		return ciudad;
	}

	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}

	public String getLocalidad() {
		return localidad;
	}

	public void setLocalidad(String localidad) {
		this.localidad = localidad;
	}

	public String getCalle() {
		return calle;
	}

	public void setCalle(String calle) {
		this.calle = calle;
	}

	public List<Reclamo> getReclamos() {
		return reclamos;
	}

	public void setReclamos(List<Reclamo> reclamos) {
		this.reclamos = reclamos;
	}

	public List<Unidad> getUnidades() {
		return unidades;
	}

	public void setUnidades(List<Unidad> unidades) {
		this.unidades = unidades;
	}

	@Override
	public String toString() {
		return "Edificio [id=" + id + ", ciudad=" + ciudad + ", localidad=" + localidad + ", calle=" + calle
				+ ", reclamos=" + reclamos + ", unidades=" + unidades + "]";
	}

}
