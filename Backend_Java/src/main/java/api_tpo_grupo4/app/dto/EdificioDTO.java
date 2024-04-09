package api_tpo_grupo4.app.dto;

public class EdificioDTO {
	private int id;
	private String ciudad;
	private String localidad;
	private String calle;

	public EdificioDTO() {
	}

	public EdificioDTO(int id, String ciudad, String localidad, String calle) {
		super();
		this.id = id;
		this.ciudad = ciudad;
		this.localidad = localidad;
		this.calle = calle;
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

	@Override
	public String toString() {
		return "EdificioDTO [id=" + id + ", ciudad=" + ciudad + ", localidad=" + localidad + ", calle=" + calle + "]";
	}
}
