import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Candidature } from '../../models/candidature.model';
import { catchError, map } from 'rxjs/operators';
// import { ToastService } from '../toast/toast.service';
import { ResponseMessage } from '../../models/ApiResponse.model';
import { Offres } from '../../models/offres.model.ts';
// import { environment } from '../../../environments/environment.js';


@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  // private baseUrl = 'http://localhost:8085/api/Candidature';
  // private API_URL_Cand = environment.apiCand; // Use environment API URL

  private API_URL_Cand = 'http://192.168.49.2:30101/api/Candidature'; // Use environment API URL

  // constructor(private http: HttpClient, private toastService: ToastService) {}
  constructor(private http: HttpClient) {}


  getCandidatureList(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.API_URL_Cand}/all`);
  }

  getCandidature(id: number): Observable<Candidature> {
    return this.http.get<Candidature>(`${this.API_URL_Cand}/getone/${id}`);
  }

  createCandidature(candidature: Candidature, userId: number, offreId: number): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.API_URL_Cand}/save/${userId}/${offreId}`, candidature).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Une erreur est survenue.';
        // this.toastService.show(errorMessage); // Show the error message in the toast
        return throwError({ message: errorMessage });
      })
    );
  }

  updateCandidature(id: number, candidature: Candidature): Observable<Object> {
    return this.http.put(`${this.API_URL_Cand}/update/${id}`, candidature);
  }

  deleteCandidature(id: number): Observable<Object> {
    return this.http.delete(`${this.API_URL_Cand}/delete/${id}`);
  }
  acceptCandidature(id: number): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.API_URL_Cand}/accept/${id}`, {});
  }

  refuseCandidature(id: number): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.API_URL_Cand}/refuse/${id}`, {});
  }
  getCandidaturesByOffre(offreId: number): Observable<Offres> {
    return this.http.get<Offres>(`${this.API_URL_Cand}/offres/${offreId}/candidatures`);
  }
}
