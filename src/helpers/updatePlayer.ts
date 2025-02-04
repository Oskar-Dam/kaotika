import { UnPopulatedPlayer } from "@/_common/interfaces/UnPopulatedPlayer";
import { Cart } from "@/_common/types/Product";

export const updatePlayerInventory = (player: UnPopulatedPlayer, productsData: Cart) => {
  productsData.map((productData) => {
    switch (productData.product.type) {
      case 'weapon':
        player.inventory.weapons = [...player.inventory.weapons, productData.product._id];
        break;
      case 'shield':
        player.inventory.shields = [...player.inventory.shields, productData.product._id];
        break;
      case 'helmet':
        player.inventory.helmets = [...player.inventory.helmets, productData.product._id];
        break;
      case 'armor':
        player.inventory.armors = [...player.inventory.armors, productData.product._id];
        break;
      case 'boot':
        player.inventory.boots = [...player.inventory.boots, productData.product._id];
        break;
      case 'ring':
        player.inventory.rings = [...player.inventory.rings, productData.product._id];
        break;
      case 'artifact':
        player.inventory.artifacts = [...player.inventory.artifacts, productData.product._id];
        break;
      case 'ingredient':
        for (let index = 0; index < productData.quantity; index++) {
          player.inventory.ingredients = [...player.inventory.ingredients, productData.product._id];
        }
        break;
    };
  });
};

export const updatePlayerGold = (player: UnPopulatedPlayer, value: number) => {
  player.gold -= value;
};