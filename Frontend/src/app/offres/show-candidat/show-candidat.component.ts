import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidatureService } from '../../services/candidature/candidature.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast/toast.service';
import { OffresService } from '../../services/offre/offre.service';
import { Offres } from '../../models/offres.model.ts';

@Component({
  selector: 'app-show-candidat',
  templateUrl: './show-candidat.component.html',
  // styleUrls: ['./show-candidat.component.scss']
})
export class ShowCandidatComponent implements OnInit {
  offre: Offres | null = null;
  offreId: number | null = null;

  constructor(
    private candidatureService: CandidatureService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private offresService: OffresService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.offreId = +id;
      this.loadOffre(this.offreId);
    }
  }

  loadOffre(id: number) {
    this.offresService.getOffreById(id).subscribe(
      data => {
        this.offre = data;
      },
      error => {
        console.error('Error fetching offre', error);
      }
    );
  }

  goToCandidatureList() {
    this.router.navigate(['/candidatures']);
  }

  acceptCandidature(id: number) {
    this.candidatureService.acceptCandidature(id).subscribe(
      () => {
        this.updateCandidatureState(id, 'acceptée'); // Update state locally
      }
    );
    location.reload(); 

  }

  // refuseCandidature(id: number) {
  //   this.candidatureService.refuseCandidature(id).subscribe(
  //     () => {
  //       this.toastService.show('Candidature refusée avec succès !');
  //       this.updateCandidatureState(id, 'refusée'); // Update state locally
  //     },
  //     () => {
  //       this.toastService.show('Erreur lors du refus de la candidature.');
  //     }
  //   );
  // }
  refuseCandidature(id: number) {
    this.candidatureService.refuseCandidature(id).subscribe(
      () => {
        this.updateCandidatureState(id, 'refusée'); // Update state locally
      },

    );
    location.reload(); 
  }

  private updateCandidatureState(id: number, state: string) {
    if (this.offre && this.offre.candidatures) {
      const candidature = this.offre.candidatures.find(c => c.id === id);
      if (candidature) {
        candidature.etatCandidature = state; // Update state in the local object
      }
    }
  }
}
