import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { OffresListComponent } from './offres/offres-list/offres-list.component';
import { OffreDetailComponent } from './offres/offres-detail/offres-detail.component'; // Ensure correct import
import { OffreCreateComponent } from './offres/offre-create/offre-create.component';
import { OffreUpdateComponent } from './offres/offre-update/offre-update.component';
import { CandidatureUpdateComponent } from './candidature/candidature-update/candidature-update.component';
import { CandidatureListComponent } from './candidature/candidature-list/candidature-list.component';
import { CandidatureDetailComponent } from './candidature/candidature-detail/candidature-detail.component';
import { CandidatureCreateComponent } from './candidature/candidature-create/candidature-create.component';
import { ShowCandidatComponent } from './offres/show-candidat/show-candidat.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/offres', pathMatch: 'full' },
  { path: 'offres', component: OffresListComponent },
  { path: 'offre/:id', component: OffreDetailComponent,canActivate: [AuthGuard] },
  { path: 'create-offre', component: OffreCreateComponent,canActivate: [AuthGuard] },
  { path: 'update-offre/:id', component: OffreUpdateComponent,canActivate: [AuthGuard] },
  { path: 'show-candidat/:id', component: ShowCandidatComponent,canActivate: [AuthGuard] },
  { path: 'candidatures', component: CandidatureListComponent ,canActivate: [AuthGuard]},
  { path: 'candidature/:id', component: CandidatureDetailComponent ,canActivate: [AuthGuard]},
  { path: 'create-candidature', component: CandidatureCreateComponent ,canActivate: [AuthGuard]},
  { path: 'update-candidature/:id', component: CandidatureUpdateComponent ,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
