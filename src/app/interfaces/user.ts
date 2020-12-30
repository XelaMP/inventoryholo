export interface User {
  _id?: number;
  idPerson?: number;
  username: string;
  password: string;
  rol: string;
  name: string;
  lastName: string;
  cel: string;
  phone: string;
  address: string;
  dni: string;
  mail: string;
  idWarehouse?: number;
}

export interface UserLogin {
  username: string;
  password: string;
}
