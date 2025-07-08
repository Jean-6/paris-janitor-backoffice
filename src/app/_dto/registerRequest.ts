


export interface Role{

}

export interface Address{
  street: string;
  city: string;
  zip: string;
  //created_at: Date;

}

export interface ProfileInfo{
  username: string;
  role: Role;
  address: Address;
}

export interface PrivateInfo{
  email: string;
  password: string;
}

export interface RegisterRequest {
  profileInfo : ProfileInfo;
  privateInfo: PrivateInfo;
}
