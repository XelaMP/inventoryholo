export interface Product {
  _id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  idCategory: number;

  idProductMeasure?: number;
  idMeasure?: number;
  measure?: string;
  unity?: number;
  minAlert?: number;
  perishable?: boolean;
  ignore?: boolean;
}


export interface ProductX {
  Nombre: string;
  Precio: number;
  Stock: number;
  Medida?: string;
  Unidades?: number;
  Descripción?: string;
  Lotes?: string;
  Fecha_Vencimiento?: string;
}
