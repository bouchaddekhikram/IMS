package com.gestion.stage.models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Data
public class Candidature {
    // @Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nivEtude")
    private String nivEtude;
    @Column(name = "etablissement")
    private String etablissement;
    @Column(name = "specialite")
    private String specialite;
    @Column(name = "etatCandidature")
    private String etatCandidature;


    @ManyToOne
    private User user ;
    @JsonIgnore

    @ManyToOne
    private Offres offres;

}
