import ProductsCardsContainer from "./ProductsCardsContainer";
import UserComponent from "./UserComponent";
import { Player } from "@/_common/interfaces/Player";
import { useEffect, useState } from "react";
import { Product, Products } from "@/_common/types/Product";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Armor } from "@/_common/interfaces/Armor";
import { Boot } from "@/_common/interfaces/Boot";
import { Shield } from "@/_common/interfaces/Shield";
import { Weapon } from "@/_common/interfaces/Weapon";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Ring } from "@/_common/interfaces/Ring";
import DropDownComponent from "./DropDownComponent";
import { accesoriesSortOptions, defaultSortOptions, defensiveEquipmentSortOptions, ingredientsSortOptions, inventorySortOptions, ofensiveEquipmentsSortOptions } from "@/constants/constants";
import { AntidotePotion } from "@/_common/interfaces/AntidotePotion";
import { HealingPotion } from "@/_common/interfaces/HealingPotion";
import { EnhancerPotion } from "@/_common/interfaces/EnhancerPotion";
import { Modifier } from "@/_common/interfaces/Modifier";

interface Props {
  products: Products;
  category: string;
  onProductSelect: (product: Product) => void;
  player: Player;
  setMerchantMessage: Function;
  setSortedProducts: (products: Products) => void;
};

const hasDefense = (product: Product): product is (Helmet | Armor | Boot | Shield) => {
  return "defense" in product;
};

const isWeapon = (product: Product): product is Weapon => {
  return "base_percentage" in product && "die_faces" in product;
};

const isEquipment = (product: Product): product is (Weapon | Shield | Helmet | Armor | Boot | Ring | Artifact | HealingPotion | EnhancerPotion) => {
  return "min_lvl" in product;
};

const isAntidotePotion = (product: Product): product is AntidotePotion => {
  return "recovery_effect" in product;
};

const getModifierValue = (product: Product, modifier: keyof Modifier): number => {
  if (isAntidotePotion(product)) {
    return product.recovery_effect.modifiers[modifier];
  } else if (isEquipment(product)) {
    return product.modifiers[modifier];
  }
  return 0;
};


const RightContainer: React.FC<Props> = ({ products, category, onProductSelect, player, setMerchantMessage, setSortedProducts }) => {
  const [sortOption, setSortOption] = useState<string>('gold');
  const [sortAscendant, setSortAscendant] = useState<boolean>(false);

  useEffect(() => {
    if (products.length > 0) {
      sortProducts('gold');
    }
  }, [category]);

  useEffect(() => {
    sortProducts(sortOption);
  }, [sortOption]);

  const changeAscendant = () => {
    setSortAscendant((prevAscendant) => {
      const newAscendant = !prevAscendant;
      sortProducts(sortOption, newAscendant);
      return newAscendant;
    });
  };

  const sortProducts = (option: string, ascendant = sortAscendant) => {
    setSortOption(option);

    const sortedProducts: Products = [...products].sort((prevProduct, product) => {
      switch (option) {
        case 'gold':
          return ascendant ? product.value - prevProduct.value : prevProduct.value - product.value;
        case 'min_lvl':
          return (isEquipment(product) || isAntidotePotion(product)) && (isEquipment(prevProduct) || isAntidotePotion(prevProduct)) 
            ? ascendant ? product.min_lvl - prevProduct.min_lvl : prevProduct.min_lvl - product.min_lvl 
            : 0;
        case 'base_porcentage':
          return isWeapon(product) && isWeapon(prevProduct) 
            ? ascendant ? product.base_percentage - prevProduct.base_percentage : prevProduct.base_percentage - product.base_percentage 
            : 0;
        case 'defense':
          return hasDefense(product) && hasDefense(prevProduct) 
            ? ascendant ? product.defense - prevProduct.defense : prevProduct.defense - product.defense 
            : 0;
        case 'intelligence':
          return ascendant 
            ? getModifierValue(product, 'intelligence') - getModifierValue(prevProduct, 'intelligence')
            : getModifierValue(prevProduct, 'intelligence') - getModifierValue(product, 'intelligence');
        case 'dexterity':
          return ascendant 
            ? getModifierValue(product, 'dexterity') - getModifierValue(prevProduct, 'dexterity')
            : getModifierValue(prevProduct, 'dexterity') - getModifierValue(product, 'dexterity');
        case 'insanity':
          return ascendant 
            ? getModifierValue(product, 'insanity') - getModifierValue(prevProduct, 'insanity')
            : getModifierValue(prevProduct, 'insanity') - getModifierValue(product, 'insanity');
        case 'charisma':
          return ascendant 
            ? getModifierValue(product, 'charisma') - getModifierValue(prevProduct, 'charisma')
            : getModifierValue(prevProduct, 'charisma') - getModifierValue(product, 'charisma');
        case 'constitution':
          return ascendant 
            ? getModifierValue(product, 'constitution') - getModifierValue(prevProduct, 'constitution')
            : getModifierValue(prevProduct, 'constitution') - getModifierValue(product, 'constitution');
        case 'strength':
          return ascendant 
            ? getModifierValue(product, 'strength') - getModifierValue(prevProduct, 'strength')
            : getModifierValue(prevProduct, 'strength') - getModifierValue(product, 'strength');
        default:
          return 0;
      }
    });

    setSortedProducts(sortedProducts);
  };

  const selectOptions = (category: string) => {
    switch (category) {
      case 'weapon':
        return ofensiveEquipmentsSortOptions;
      case 'shield':
      case 'helmet':
      case 'armor':
      case 'boot':
        return defensiveEquipmentSortOptions;
      case 'ring':
      case 'artifact':
        return accesoriesSortOptions;
      case 'ingredient':
        return ingredientsSortOptions;
      case 'inventory':
        return inventorySortOptions;
      default:
        return defaultSortOptions;
    };
  };

  return (
    <>
      <div className="w-[5.6%] h-full bg-cover bg-no-repeat bg-[url('/images/shop/separator_glyph.webp')]" />
      <div className="w-4/12 grid grid-rows-10">
        <div className="w-full flex justify-center row-span-2 row-start-0 p-[2%]">
          <UserComponent name={player.nickname} gold={player.gold} level={player.level} />
        </div>
        <div className="w-full row-span-1 row-start-3 pt-[2%] pb-[2%] pr-[4%] flex justify-center">
          <DropDownComponent options={selectOptions(category)} selectedOption={sortOption} handleFunction={sortProducts} />
          <button className="ml-[2%] block w-1/12 bg-gray-200 text-black rounded-md 2xl:text-3xl lg:text-xl sm:text-base appearance-none" onClick={() => { changeAscendant() }}>{sortAscendant ? '↓' : '↑'}</button>
        </div>
        <ProductsCardsContainer
          isSelling={category === 'inventory' ? true : false}
          products={products}
          onProductSelect={onProductSelect}
          setMerchantMessage={setMerchantMessage}
        />
      </div>
    </>
  );
};

export default RightContainer;