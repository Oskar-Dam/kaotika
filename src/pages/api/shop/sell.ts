import { Player } from '@/_common/interfaces/Player';
import { Product } from '@/_common/types/Product';
import { DBConnect, DBDisconnect } from '@/database/dbHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { populatePlayer } from './player';
const PlayerModel = require("../../../database/models/playerSchema");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const email = req.body.email;
  const productData = req.body.product;
  const value = calculatePurchaseValue(productData);
  console.log('Product value: ', value);

  try {
    await DBConnect();
    let mongoPlayer = await PlayerModel.findOne({ email: email });

    if (mongoPlayer) {
      console.log('Player gold: ', mongoPlayer.gold);
      updatePlayerInventory(mongoPlayer, productData);
      updatePlayerGold(mongoPlayer, value);
      console.log('Updated player gold: ', mongoPlayer.gold);
      await mongoPlayer.save();
      const returnPlayer = await populatePlayer(mongoPlayer.email)
      console.log('PLAYER TO RETURN: ', returnPlayer);

      await DBDisconnect();
      return res.status(200).json(returnPlayer);
    } else {
      await DBDisconnect();
      return res.status(404).json({ error: 'Player returned is not correct' });
    }
  } catch (error) {
    await DBDisconnect();
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const calculatePurchaseValue = (productData: { product: Product, quantity: number }) => {
  return Math.floor(productData.product.value * productData.quantity / 3);
};

const updatePlayerInventory = (player: Player, productData: { product: Product, quantity: number }) => {
  switch (productData.product.type) {
    case 'weapon':
      console.log('Player inventory weapons: ', player.inventory.weapons);
      player.inventory.weapons = player.inventory.weapons.filter((item) => item._id.toString() !== productData.product._id);
      console.log('Updated player inventory weapons: ', player.inventory.weapons);
      break;
    case 'shield':
      console.log('Player inventory shields: ', player.inventory.shields);
      player.inventory.shields = player.inventory.shields.filter((item) => item._id.toString() !== productData.product._id);
      console.log('Updated player inventory shields: ', player.inventory.shields);
      break;
    case 'helmet':
      console.log('Player inventory helmets: ', player.inventory.helmets);
      player.inventory.helmets = player.inventory.helmets.filter((item) => item._id.toString() !== productData.product._id);
      console.log('Updated player inventory helmets: ', player.inventory.helmets);
      break;
    case 'armor':
      console.log('Player inventory armors: ', player.inventory.armors);
      player.inventory.armors = player.inventory.armors.filter((item) => item._id.toString() !== productData.product._id);
      console.log('Updated player inventory armors: ', player.inventory.armors);
      break;
    case 'boot':
      console.log('Player inventory boots: ', player.inventory.boots);
      player.inventory.boots = player.inventory.boots.filter((item) => item._id.toString() !== productData.product._id);
      console.log('Updated player inventory boots: ', player.inventory.boots);
      break;
    case 'ring':
      console.log('Player inventory rings: ', player.inventory.rings);
      player.inventory.rings = player.inventory.rings.filter((item) => item._id.toString() !== productData.product._id);
      console.log('Updated player inventory rings: ', player.inventory.rings);
      break;
    case 'artifact':
      console.log('Player inventory artifacts: ', player.inventory.artifacts);
      player.inventory.artifacts = player.inventory.artifacts.filter((item) => item._id.toString() !== productData.product._id);
      console.log('Updated player inventory artifacts: ', player.inventory.artifacts);
      break;
    case 'ingredient':
      console.log('Player inventory ingredients: ', player.inventory.ingredients);
      let ingredients = [...player.inventory.ingredients];

      for (let i = 0; i < productData.quantity; i++) {
        const pos = ingredients.map(ingredient => ingredient._id.toString()).indexOf(productData.product._id);
        ingredients.splice(pos, 1);
      }

      player.inventory.ingredients = ingredients;
      console.log('Updated player inventory ingredients: ', player.inventory.ingredients);
      break;

    case 'antidote':
      console.log('Player inventory antidote potions: ', player.inventory.antidote_potions);
      player.inventory.antidote_potions = player.inventory.antidote_potions.filter((item) => item._id.toString() !== productData.product._id);
      console.log('Updated player inventory antidote potions: ', player.inventory.antidote_potions);
      break;
    case 'elixir':
        console.log('Player inventory enhancer potions: ', player.inventory.enhancer_potions);
        player.inventory.enhancer_potions = player.inventory.enhancer_potions.filter((item) => item._id.toString() !== productData.product._id);
        console.log('Updated player inventory enhancer potions: ', player.inventory.enhancer_potions);
        break;
    case 'essence':
      console.log('Player inventory healing potion: ', player.inventory.healing_potions);
      player.inventory.healing_potions = player.inventory.healing_potions.filter((item) => item._id.toString() !== productData.product._id);
      console.log('Updated player inventory healing potions: ', player.inventory.healing_potions);
      break;
  };
};

const updatePlayerGold = (player: Player, value: number) => {
  player.gold += value;
};