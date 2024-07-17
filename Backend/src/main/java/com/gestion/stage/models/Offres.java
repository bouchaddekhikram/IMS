package com.gestion.stage.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Offres {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "intitule")
    private String intitule;
    @Column(name = "description")
    private String description;
    @Column(name = "dateDebut")
    private Date dateDebut;
    @Column(name = "dateFin")
    private Date dateFin;
    @Column(name = "nb_stagiaires")
    private Integer nb_stagiaires;
    @Column(name = "nivEtude")
    private String nivEtude;
    @Column(name = "typeStage")
    private String typeStage;
    @Column(name = "etatStage")
    private String etatStage;
    @OneToMany(mappedBy = "offres")
    private List<Candidature> candidatures = new ArrayList<Candidature>();
    @JsonIgnore
    @ManyToOne
    User user;



    // Méthode pour mettre à jour l'état de l'offre
    public void updateEtatStage() {
        long acceptedCandidatures = candidatures.stream()
                .filter(c -> "acceptée".equals(c.getEtatCandidature()))
                .count();
        if (acceptedCandidatures >= nb_stagiaires) {
            this.etatStage = "not available";
        } else {
            this.etatStage = "available";
        }
    }
}