import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const API_URL = 'http://localhost:8085/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  getUserRole(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.roles ? user.roles[0] : '';
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${API_URL}signin`, credentials).pipe(
      tap(response => {
        if (response && response.accessToken) {
          localStorage.setItem('token', response.accessToken);
          const user = {
            id: response.id,
            username: response.username,
            email: response.email,
            roles: response.roles
          };
          localStorage.setItem('user', JSON.stringify(user));
          this.loggedIn.next(true);
        }
      }),
      catchError(this.handleError)
    );
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${API_URL}signup`, user).pipe(
      tap(response => {
        if (response && response.accessToken) {
          const user = {
            id: response.id,
            username: response.username,
            email: response.email,
            roles: response.roles
          };
          localStorage.setItem('user', JSON.stringify(user));
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    return throwError(errorMessage);
  }

  getCurrentUserId(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.id || 0;
  }
}










// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError, BehaviorSubject } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { Router } from '@angular/router';

// const API_URL = 'http://localhost:8085/api/auth/';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

//   constructor(private http: HttpClient,    private router: Router
//   ) { }

//   getUserRole(): string {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     console.log('Stored User:', user); // Debugging statement
//     return user.roles ? user.roles[0] : ''; // Adjust according to your user object structure
//   }

//   get isLoggedIn(): Observable<boolean> {
//     return this.loggedIn.asObservable();
//   }




//   private hasToken(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   login(credentials: any): Observable<any> {
//     return this.http.post<any>(`${API_URL}signin`, credentials).pipe(
//       tap(response => {
//         console.log('API Response:', response); // Debugging statement
//         if (response && response.accessToken) {
//           localStorage.setItem('token', response.accessToken);
//           const user = {
//             id: response.id,
//             username: response.username,
//             email: response.email,
//             roles: response.roles
//           };
//           localStorage.setItem('user', JSON.stringify(user));

//           this.loggedIn.next(true);

//         }
//       }),
//       catchError(this.handleError)
//     );

//   }

//   register(user: any): Observable<any> {
//     return this.http.post<any>(`${API_URL}signup`, user).pipe(
//       tap(response => {
//         console.log('API Response:', response); // Debugging statement
//         if (response && response.accessToken) {
//           const user = {
//             id: response.id,
//             username: response.username,
//             email: response.email,
//             roles: response.roles
//           };
//           localStorage.setItem('user', JSON.stringify(user));
//         }
//       }),
//       catchError(this.handleError)
//     );
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user'); // Optional: clear user info if stored
//     this.loggedIn.next(false);
//     this.router.navigate(['/offres']);
//     location.reload();
//     this.router.navigate(['/offres']);
//     // console.log('Logged out'); // Debugging statement


//   }

//   private handleError(error: HttpErrorResponse) {
//     let errorMessage = 'Something bad happened; please try again later.';
//     if (error.error instanceof ErrorEvent) {
//       console.error('An error occurred:', error.error.message);
//       errorMessage = `An error occurred: ${error.error.message}`;
//     } else if (error.error && error.error.message) {
//       console.error(
//         `Backend returned code ${error.status}, ` +
//         `body was: ${error.error.message}`
//       );
//       errorMessage = error.error.message;
//     } else {
//       console.error(
//         `Backend returned code ${error.status}`
//       );
//     }
//     return throwError(errorMessage);
//   }
//   getCurrentUserId(): number {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     return user.id || 0; // Return user ID or 0 if not found
//   }

//   }

