import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OffresService } from '../../services/offre/offre.service';
import { Offres } from '../../models/offres.model.ts';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-offres-list',
  templateUrl: './offres-list.component.html',
  styleUrls: ['./offres-list.component.css']
})
export class OffresListComponent implements OnInit {
  offres: Offres[] = [];
  userRole: string = '';

  constructor(
    private offresService: OffresService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOffres();
    this.userRole = this.authService.getUserRole();
    console.log('User Role:', this.userRole); // Debugging statement
  }

  getOffres(): void {
    this.offresService.getAllOffres().subscribe((data: Offres[]) => {
      this.offres = data;
    });
  }

  deleteOffre(id: number): void {
    this.offresService.deleteOffre(id).subscribe({
      next: () => {
        this.getOffres(); // Refresh the list
      },
      error: (err) => {
        console.error('Delete error:', err);
        // You can also show a user-friendly message here
      }
    });
  }

  submitCandidature(offreId: number): void {
    // Check if the user is logged in
    if (!this.authService.isLoggedIn) {
      // Redirect to login page
      this.router.navigate(['/login']);
    } else {
      // If logged in, navigate to create candidature page
      this.router.navigate(['/create-candidature'], { queryParams: { offreId } });
    }
  }
}
