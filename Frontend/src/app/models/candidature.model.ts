export interface Candidature {
  id: number;
  nivEtude: string;
  etablissement: string;
  specialite: string;
  etatCandidature: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
  offres?: {
    id: number;
    intitule: string;
  }; // Make offres optional if it is not always present
}
