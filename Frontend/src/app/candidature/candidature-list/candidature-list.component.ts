import { Component, OnInit } from '@angular/core';
import { CandidatureService } from '../../services/candidature/candidature.service';
import { Candidature } from '../../models/candidature.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidature-list',
  templateUrl: './candidature-list.component.html',
  styleUrls: ['./candidature-list.component.scss']
})
export class CandidatureListComponent implements OnInit {
  candidatures: Candidature[] = []; // Initialize as an empty array

  constructor(
    private candidatureService: CandidatureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCandidatures();
  }

  private getCandidatures(): void {
    this.candidatureService.getCandidatureList().subscribe(
      data => {
        this.candidatures = data;
      },
      error => {
        console.error('Error fetching candidatures', error);
      }
    );
  }

  goToCandidatureDetail(id: number): void {
    this.router.navigate(['candidature', id]);
  }

  goToCandidatureUpdate(id: number): void {
    this.router.navigate(['update-candidature', id]);
  }

  deleteCandidature(id: number): void {
    if (confirm('Are you sure you want to delete this candidature?')) {
      this.candidatureService.deleteCandidature(id).subscribe(
        () => {
          this.getCandidatures(); // Refresh the list
        },
        error => {
          console.error('Error deleting candidature', error);
        }
      );
    }
  }

  goToCreateCandidature(): void {
    this.router.navigate(['create-candidature']);
  }
}
