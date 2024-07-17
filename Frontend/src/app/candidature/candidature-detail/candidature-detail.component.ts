import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidatureService } from '../../services/candidature/candidature.service';
import { Candidature } from '../../models/candidature.model';

@Component({
  selector: 'app-candidature-detail',
  templateUrl: './candidature-detail.component.html',
  styleUrls: ['./candidature-detail.component.scss']
})
export class CandidatureDetailComponent implements OnInit {
  id: number;
  candidature: Candidature = {} as Candidature;

  constructor(private route: ActivatedRoute, private candidatureService: CandidatureService) { 
    this.id = 0; // Default value
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.candidatureService.getCandidature(this.id).subscribe(data => {
      this.candidature = data;
    });
  }

  goBack() {
    window.history.back();
  }
}
