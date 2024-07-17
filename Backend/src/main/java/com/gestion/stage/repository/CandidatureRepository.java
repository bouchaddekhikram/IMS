package com.gestion.stage.repository;

import com.gestion.stage.models.Candidature;
import com.gestion.stage.models.Offres;
import com.gestion.stage.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidatureRepository extends JpaRepository<Candidature,Long> {

    boolean existsByUserAndOffres(User user, Offres offres);

}
