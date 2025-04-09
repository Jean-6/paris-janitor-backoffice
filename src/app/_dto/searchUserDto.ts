

export class SearchUserDto{

  status: string[] = [];
  service: string[] = [];
  firstname: string = "";
  lastname: string = "";
  department: string[] = [];
  city: string[] = [];
  availabilityFrom: Date = new Date();
  availabilityTo: Date = new Date();
}
