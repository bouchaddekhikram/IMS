import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffresService } from '../../services/offre/offre.service';
import { Offres } from '../../models/offres.model.ts';

@Component({
  selector: 'app-offre-detail',
  templateUrl: './offres-detail.component.html',
  styleUrls: ['./offres-detail.component.css']
})
export class OffreDetailComponent implements OnInit {
  offre?: Offres;

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

  deleteOffre(id?: number): void {
    if (id !== undefined) {
      this.offresService.deleteOffre(id).subscribe(() => {
        this.router.navigate(['/offres']); // Navigate back to the list
      });
    }
  }
}
