export interface Booking {
  id?: string;
  propertyId: string;
  userId: string;
  startDate: string; // format ISO: "2025-05-13T10:00:00"
  endDate: string;
  createdAt?: string; // pour suivi historique
  //title?: string; // titre affiché sur le calendrier
  //status?: 'pending' | 'confirmed' | 'cancelled'; // état de la réservation
  //updatedAt?: string;
}
