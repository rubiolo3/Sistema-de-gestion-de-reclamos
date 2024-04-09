package api_tpo_grupo4.app.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Unidad {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne

	@JoinColumn(name = "id_edificio")
	private Edificio edificio;

	@Column(name = "Piso", columnDefinition = "VARCHAR(5)")
	private int piso;

	@Column(name = "Departamento", columnDefinition = "VARCHAR(5)")
	private String departamento;

	public enum estado {
		alquiler, habitada, vacia
	}

	@Enumerated(EnumType.STRING)
	private estado estado;
	
	@ManyToOne
	@JoinColumn(name = "id_propietario")
	private Usuario usuarioPropietario;
	
	 @ManyToMany
	    @JoinTable(
	        name = "unidad_inquilinos",
	        joinColumns = @JoinColumn(name = "unidad_id"),
	        inverseJoinColumns = @JoinColumn(name = "inquilino_id")
	    )
	    private Set<Usuario> inquilinos = new HashSet<>();
	 
	@OneToMany(mappedBy = "unidad", cascade = CascadeType.ALL)
	private List<Reclamo> reclamos = new ArrayList<Reclamo>();

	public Unidad() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Unidad(int id, Edificio edificio, int piso, String departamento,
			api_tpo_grupo4.app.entity.Unidad.estado estado, Usuario usuarioPropietario, List<Usuario> inquilinos, List<Reclamo> reclamos) {
		super();
		this.id = id;
		this.edificio = edificio;
		this.piso = piso;
		this.departamento = departamento;
		this.estado = estado;
		this.usuarioPropietario = usuarioPropietario;
		this.reclamos = reclamos;
	}

	public estado getEstado() {
		return estado;
	}

	public void setEstado(estado estado) {
		this.estado = estado;
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

	public Usuario getUsuarioPropietario() {
		return usuarioPropietario;
	}

	public void setUsuarioPropietario(Usuario usuarioPropietario) {
		this.usuarioPropietario = usuarioPropietario;
	}
/*	
	public List<Usuario> getInquilinos() {
		return inquilinos;
	}

	public void setInquilinos(List<Usuario> inquilinos) {
		this.inquilinos = inquilinos;
	}
*/
	public List<Reclamo> getReclamos() {
		return reclamos;
	}

	public void setReclamos(List<Reclamo> reclamos) {
		this.reclamos = reclamos;
	}

	@Override
	public String toString() {
		return "Unidad [id=" + id + ", edificio=" + edificio + ", piso=" + piso + ", departamento=" + departamento
				+ ", estado=" + estado + ", propietario=" + usuarioPropietario + ", reclamos=" + reclamos + "]";
	}
}
