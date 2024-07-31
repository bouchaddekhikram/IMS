import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OffresListComponent } from './offres/offres-list/offres-list.component';
import { OffreUpdateComponent } from './offres/offre-update/offre-update.component';
import { OffreCreateComponent } from './offres/offre-create/offre-create.component';
import { OffreDetailComponent } from './offres/offres-detail/offres-detail.component'; // Ensure this import
import { CandidatureCreateComponent } from './candidature/candidature-create/candidature-create.component';
import { CandidatureDetailComponent } from './candidature/candidature-detail/candidature-detail.component';
import { CandidatureListComponent } from './candidature/candidature-list/candidature-list.component';
import { CandidatureUpdateComponent } from './candidature/candidature-update/candidature-update.component';
import { ToastComponent } from './toast/toast.component';
import { ShowCandidatComponent } from './offres/show-candidat/show-candidat.component';
import { AuthGuard } from './auth.guard';
// import { environment } from '../environments/environment'; 



export function tokenGetter() {
  return localStorage.getItem('token');
}
const API_URL = 'http://192.168.49.2:30101/api/auth/'; // Use environment API URL

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    OffresListComponent,
    OffreUpdateComponent,
    OffreCreateComponent,
    OffreDetailComponent, // Ensure this declaration
    CandidatureCreateComponent,
    CandidatureDetailComponent,
    CandidatureListComponent,
    CandidatureUpdateComponent,
    ToastComponent,
    ShowCandidatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // allowedDomains: ['localhost:8085'], // Adjust according to your backend API's domain
        // disallowedRoutes: ['http://localhost:8085/api/auth/'] // Adjust according to your backend API's routes
        allowedDomains: ['http://192.168.49.2:30101'], // Adjust according to your backend API's domain in Minikube
        disallowedRoutes: [API_URL] // Adjust according to your backend API's routes in Minikube
        // allowedDomains: [new URL(environment.apiAuth).hostname], // Adjust according to your backend API's domain
        // disallowedRoutes: [new URL(environment.apiAuth).origin + '/api/auth/'] // Adjust according to your backend API's routes


        // allowedDomains: ['localhost:8085'], // Adjust according to your backend API's domain
        // disallowedRoutes: ['http://localhost:8085/api/auth/'] //  Adjust according to your backend API's routes
      }
    })
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
