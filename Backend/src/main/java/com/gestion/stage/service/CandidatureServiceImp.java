package com.gestion.stage.service;


import com.gestion.stage.models.Candidature;
import com.gestion.stage.models.Offres;
import com.gestion.stage.models.User;
import com.gestion.stage.repository.CandidatureRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidatureServiceImp implements CandidatureService {
    @Autowired
    private CandidatureRepository candidatureRepository;


    @Override
    public List<Candidature> getAllCandidatures() {
        return candidatureRepository.findAll();
    }

    @Override
    public Candidature createCandidature(Candidature candidature) {
        return candidatureRepository.save(candidature);
    }

    @Override
    public Candidature getCandidatureByID(Long id) {
        return candidatureRepository.findById(id).get();
    }

    @Override
    public Candidature updateCandidatureByID(Candidature candidature) {
        return candidatureRepository.saveAndFlush(candidature);
    }

    public boolean existsByUserAndOffre(User user, Offres offre) {
        return candidatureRepository.existsByUserAndOffres(user, offre);
    }

    public Candidature getCandidatureById(Long id) {
        return candidatureRepository.findById(id).orElse(null);
    }


    @Override
    public void deleteCandidature(Long id) {
        candidatureRepository.deleteById(id);
    }
}