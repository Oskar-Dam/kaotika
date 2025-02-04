import { Player } from "@/_common/interfaces/Player";
import { Product, Products } from "@/_common/types/Product";

export const calculatePurchaseValue = (products: Products, quantity: number) => {
  let value = 0;

  products.map((product) => {
    value += product.value * quantity;
  });

  return value;
};

export const isProductInTheInventory = (player: Player, products: Products) => {
  return Object.values(player.inventory).every((items) => {
    return items.every((item: Product) => {
      return products.every((product) => {
        if (product.type === "ingredient") return true;
        return item._id !== product._id;
      });
    });
  });
};

export const isProductEquiped = (player: Player, products: Products) => {
  return Object.values(player.equipment).every((item) => {
    return products.every((product) => {
      return item?._id !== product._id;
    });
  });
};

export const isGoldSufficient = (player: Player, value: number) => {
  return player.gold >= value ? true : false;
};