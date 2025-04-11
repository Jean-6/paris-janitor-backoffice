
class Feature{
  private wifi?: boolean;
  private airConditionning?: boolean;
  private parking?:boolean;

  constructor() {
  }
}

export class CreateAdRequestDto {

  private type!: string;
  private department!:[];
  private city!:string[];
  private address!:string;
  private features?: Feature;
  private rent!: number;
}
