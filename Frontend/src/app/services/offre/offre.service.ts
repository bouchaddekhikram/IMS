import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offres } from '../../models/offres.model.ts.js';

@Injectable({
  providedIn: 'root'
})
export class OffresService {
  private apiUrl = 'http://localhost:8085/api/Offre';

  constructor(private http: HttpClient) { }

  getAllOffres(): Observable<Offres[]> {
    return this.http.get<Offres[]>(`${this.apiUrl}/all`);
  }

  getOffreById(id: number): Observable<Offres> {
    return this.http.get<Offres>(`${this.apiUrl}/getone/${id}`);
  }

  createOffre(offre: Offres): Observable<Offres> {
    return this.http.post<Offres>(`${this.apiUrl}/save/1`, offre); // Change 1 to the actual idRH
  }

  updateOffre(id: number, offre: Offres): Observable<Offres> {
    return this.http.put<Offres>(`${this.apiUrl}/update/${id}`, offre);
  }

  deleteOffre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  getCurrecntOffre(): number {
    const offre = JSON.parse(localStorage.getItem('offre') || '{}');
    return offre.id || 0; // Return offre ID or 0 if not found
  }
}
