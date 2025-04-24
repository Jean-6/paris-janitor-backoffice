


export class LoginResponse {
  private id?: number; // TypeScript utilise 'number' pour les entiers
  private email?: string; // Type 'string' pour les chaînes de caractères
  private roles?: string[]; // Un tableau de chaînes pour représenter les rôles
  private accessToken?: string; // Jeton d'accès
  private refreshToken?: string; // Jeton de rafraîchissement
  private tokenType?: string; // Type de jeton
}
