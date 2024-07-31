import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offres } from '../../models/offres.model.ts';
// import { environment } from '../../../environments/



@Injectable({
  providedIn: 'root'
})
export class OffresService {
  // private apiUrl = 'http://localhost:8085/api/Offre';
  // private API_URL_Off = environment.apiOffre; // Use environment API URL
  private API_URL_Off =  'http://192.168.49.2:30101/api/Offre'; // Use environment API URL


  constructor(private http: HttpClient) { }

  getAllOffres(): Observable<Offres[]> {
    return this.http.get<Offres[]>(`${this.API_URL_Off}/all`);
  }

  getOffreById(id: number): Observable<Offres> {
    return this.http.get<Offres>(`${this.API_URL_Off}/getone/${id}`);
  }

  createOffre(offre: Offres): Observable<Offres> {
    return this.http.post<Offres>(`${this.API_URL_Off}/save/1`, offre); // Change 1 to the actual idRH
  }

  updateOffre(id: number, offre: Offres): Observable<Offres> {
    return this.http.put<Offres>(`${this.API_URL_Off}/update/${id}`, offre);
  }

  deleteOffre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL_Off}/delete/${id}`);
  }
  getCurrecntOffre(): number {
    const offre = JSON.parse(localStorage.getItem('offre') || '{}');
    return offre.id || 0; // Return offre ID or 0 if not found
  }
}
