


export interface TimeSlot{
  startDate: Date;
  endDate: Date;
}

export interface Availability{
  providerId: string;
  day: string;
  timeSlots: TimeSlot[];
}



