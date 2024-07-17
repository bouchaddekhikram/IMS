package com.gestion.stage.service;

import com.gestion.stage.models.Candidature;

import java.util.List;

public interface CandidatureService {


    List<Candidature> getAllCandidatures();

    Candidature createCandidature(Candidature candidature);

    Candidature getCandidatureByID(Long id);

    Candidature updateCandidatureByID(Candidature candidature);

    void deleteCandidature(Long id);
}