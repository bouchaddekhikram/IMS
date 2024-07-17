package com.gestion.stage.service;

import com.gestion.stage.models.Offres;

import java.util.List;

public interface OffresService {
    List<Offres> getAllOffres();

    Offres createOffre(Offres offres);

    Offres getOffreByID(Long id);

    Offres updateOffreByID(Offres offres);

    void deleteOffre(Long id);
}
