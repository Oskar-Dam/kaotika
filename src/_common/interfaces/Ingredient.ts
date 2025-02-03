export interface Ingredient {
  _id: string,
  name: string,
  description: string,
  type: string,
  value: number,
  image: string,
  effects: string[],
  qty: number
}