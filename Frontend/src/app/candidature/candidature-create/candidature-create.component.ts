import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidatureService } from '../../services/candidature/candidature.service';
import { Candidature } from '../../models/candidature.model';
import { AuthService } from '../../services/auth.service';
// import { ToastService } from '../../services/toast/toast.service'; // Add this import if using ToastService
import { ResponseMessage } from '../../models/ApiResponse.model';

@Component({
  selector: 'app-candidature-create',
  templateUrl: './candidature-create.component.html',
  styleUrls: ['./candidature-create.component.scss']
})
export class CandidatureCreateComponent implements OnInit {
  candidature: Candidature = {
    id: 0, // Add this line
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
    } // Add offres property if needed
  };

  userId: number = 0;
  offreId: number = 0;
  message: string = ''; // String for the message

  constructor(
    private candidatureService: CandidatureService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    // private toastService: ToastService // Inject ToastService if you want to use it
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId();

    // Get offreId from query parameters
    this.route.queryParams.subscribe(params => {
      this.offreId = params['offreId'];
      console.log('Offre ID:', this.offreId);

      if (this.offreId && this.candidature.offres) {
        this.candidature.offres.id = this.offreId;
      }
    });
  }

  onSubmit() {
    if (!this.authService.isLoggedIn) {
      // this.message = 'Vous devez vous connecter pour soumettre une candidature.';
      // this.toastService.show(this.message);
      return; // Stop the submission process
    }

    this.candidature.user.id = this.userId;
    this.candidatureService.createCandidature(this.candidature, this.userId, this.offreId).subscribe(
      () => {
        // Assuming a successful submission
        // this.message = 'Candidature soumise avec succès !';
        // this.toastService.show(this.message);
        this.goToCandidatureList();
      },
      ()=>{    this.router.navigate(['/offres']);
      }

    // this.candidatureService.createCandidature(this.candidature, this.userId, this.offreId).subscribe(
    //   (response: ResponseMessage) => {
    //     // Assuming a successful submission
    //     this.message = 'Candidature soumise avec succès !';
    //     // this.toastService.show(this.message);
    //     this.goToCandidatureList();
    //   },
      // () => {
      //   // For any error, simply show this message
      //   this.message = 'Vous avez déjà postulé pour cette offre.';
      //   // this.toastService.show(this.message);
      // }
    );
  }

  goToCandidatureList() {
    this.router.navigate(['/offres']);
  }
}
