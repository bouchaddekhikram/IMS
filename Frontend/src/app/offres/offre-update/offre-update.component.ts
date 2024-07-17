import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffresService } from '../../services/offre/offre.service';
import { Offres } from '../../models/offres.model.ts';

@Component({
  selector: 'app-offre-update',
  templateUrl: './offre-update.component.html',
  styleUrls: ['./offre-update.component.css']
})
export class OffreUpdateComponent implements OnInit {
  offre: Offres = {
    id: 0,
    intitule: '',
    description: '',
    dateDebut: new Date(),
    dateFin: new Date(),
    nb_stagiaires: 0,
    nivEtude: '',
    typeStage: '',
    etatStage: '',
    candidatures: [] // Ensure candidatures is included
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offresService: OffresService
  ) { }

  ngOnInit(): void {
    this.getOffre();
  }

  getOffre(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.offresService.getOffreById(id).subscribe((data: Offres) => {
      this.offre = data;
    });
  }

  onSubmit(): void {
    this.offresService.updateOffre(this.offre.id, this.offre).subscribe(() => {
      this.router.navigate(['/offres']); // Navigate back to the list after update
    });
  }
}
