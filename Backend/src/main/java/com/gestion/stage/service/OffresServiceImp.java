package com.gestion.stage.service;

import com.gestion.stage.models.Offres;
import com.gestion.stage.repository.OffresRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class OffresServiceImp implements OffresService {
    @Autowired
    private OffresRepository offresRepository;

    @Override
    public List<Offres> getAllOffres() {
        return offresRepository.findAll();
    }

    @Override
    public Offres createOffre(Offres offres) {
        return offresRepository.save(offres);
    }

    @Override
    public Offres getOffreByID(Long id) {
        return offresRepository.findById(id).get();
    }

    @Override
    public Offres updateOffreByID(Offres offres) {
        return offresRepository.saveAndFlush(offres);
    }

    @Override
    public void deleteOffre(Long id) {
        offresRepository.deleteById(id);}

    public void updateEtatOffre(Offres offre) {
        offre.updateEtatStage();
        offresRepository.save(offre);
    }

}