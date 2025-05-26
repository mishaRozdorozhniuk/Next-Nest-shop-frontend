export default interface Product {
  imageUrl: string | StaticImport;
  id: number;
  name: string;
  description: string;
  price: number;
  imageExists: boolean;
  imageExtension: string;
}

export default interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imageExists: boolean;
  imageExtension: string;
}
