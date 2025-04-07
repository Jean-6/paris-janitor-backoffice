

export class SearchPropertyDto{

  type: string[] = [];
  department: string[] = [];
  city: string[] = [];
  budgetMin: string = '';
  budgetMax: string = '';
  areaMin: number = 0;
  areaMax: number = 0;
  arrival: Date = new Date();
  departure: Date = new Date();
}
