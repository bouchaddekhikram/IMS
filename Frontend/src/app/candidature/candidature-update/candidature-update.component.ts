import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatureService } from '../../services/candidature/candidature.service';
import { Candidature } from '../../models/candidature.model';

@Component({
  selector: 'app-candidature-update',
  templateUrl: './candidature-update.component.html',
  styleUrls: ['./candidature-update.component.scss']
})
export class CandidatureUpdateComponent implements OnInit {
  id!: number; // Use definite assignment assertion
  candidature: Candidature = {
    id: 0, // Ensure id is included
    nivEtude: '',
    etablissement: '',
    specialite: '',
    etatCandidature: 'En attente',
    user: {
      id: 0,
      username: '',
      email: ''
    },
    offres: {
      id: 0,
      intitule: ''
    } // Ensure offres is included if needed
  };

  constructor(
    private candidatureService: CandidatureService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.candidatureService.getCandidature(this.id).subscribe(data => {
      this.candidature = data;
    }, error => console.log(error));
  }

  onSubmit() {
    this.candidatureService.updateCandidature(this.id, this.candidature).subscribe(data => {
      this.goToCandidatureList();
    }, error => console.log(error));
  }

  goToCandidatureList() {
    this.router.navigate(['/candidatures']);
  }
}
