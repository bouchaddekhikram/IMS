import { Candidature } from './candidature.model'; // Ensure this path is correct

export interface Offres {
  id: number;
  intitule: string;
  description: string;
  dateDebut: Date;
  dateFin: Date;
  nb_stagiaires: number;
  nivEtude: string;
  typeStage: string;
  etatStage: string;
  candidatures: Candidature[]; // This should be correctly typed
}
