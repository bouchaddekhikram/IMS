import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OffresService } from '../../services/offre/offre.service';
import { Offres } from '../../models/offres.model.ts';
@Component({
  selector: 'app-offre-create',
  templateUrl: './offre-create.component.html',
  styleUrls: ['./offre-create.component.css']
})
export class OffreCreateComponent  {
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
    private offresService: OffresService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.offresService.createOffre(this.offre).subscribe(() => {
      this.router.navigate(['/offres']);
    });
  }
}
