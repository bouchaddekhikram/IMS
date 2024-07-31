export interface Environment {
    production: boolean;
    apiAuth: string;
    apiCand: string;
    apiOffre: string;
  }
  
  declare const environment: Environment;
  