


export interface RegisterResponse {

  id?: number; // TypeScript utilise 'number' pour les entiers
  email?: string; // Type 'string' pour les chaînes de caractères
  roles?: string[]; // Un tableau de chaînes pour représenter les rôles
  accessToken?: string; // Jeton d'accès
  refreshToken?: string; // Jeton de rafraîchissement
  tokenType?: string; // Type de jeton

}
