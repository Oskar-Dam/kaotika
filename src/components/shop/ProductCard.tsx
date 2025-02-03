import { Product } from "@/_common/types/Product";
import GoldComponent from "./GoldComponent";
import IncrementDecrement from "./UpdateQtyButton";
import { Weapon } from "@/_common/interfaces/Weapon";
import { Shield } from "@/_common/interfaces/Shield";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Armor } from "@/_common/interfaces/Armor";
import { Boot } from "@/_common/interfaces/Boot";
import { Ring } from "@/_common/interfaces/Ring";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Ingredient } from "@/_common/interfaces/Ingredient";
import { EnhancerPotion } from "@/_common/interfaces/EnhancerPotion";
import { AntidotePotion } from "@/_common/interfaces/AntidotePotion";
import { HealingPotion } from "@/_common/interfaces/HealingPotion";
import { Modifier } from "@/_common/interfaces/Modifier";

interface Props {
  product: Product;
  isSelected: boolean;
  onClick: () => void;
  handleRemoval: (product: Product) => void;
  isInCart?: boolean;
  handleQuantityChange: (product: Product, quantity: number) => void;
  quantity?: number;
  index: number;
  isSelling?: boolean
};

const PRODUCT_CART = {
  mainContainer: "flex h-[53%] w-[90%] row-span-3 row-start-8 place-items-center justify-center mt-[3%] ml-[5%] bg-contain bg-center bg-no-repeat",
  imgContainer: "flex w-[35%] justify-center place-items-center h-[90%]  bg-contain bg-center bg-no-repeat",
  productImg: 'w-[60%] rounded-[2%]',
  infoContainer: 'w-[30%] h-[90%] place-items-center text-center justify-content-start space-y-[6%] inline-block',
  name: "h-[30%]  ml-[5%] self-center w-[90%] text-2xl text-white",
  requirementsContainer: "w-[100%] flex justify-center place-items-center mb-[2%]",
  goldContainer: "w-[50%] flex justify-content-start mr-[5%] mb-[10%]",
  levelContainer: "justify-end flex space-x-[50%] inline-row",
  levelRequirement: "text-xl w-[2%] text-white",
  levelValue: "text-4xl pr-[12%]"
};

const PRODUCT_SHOP = {
  mainContainer: `h-[50%] flex mt-[3%] pt-[2%] bg-[length:100%_100%] bg-center bg-no-repeat transform transition-transform duration-300 hover:scale-105 cursor-pointer`,
  imgContainer: "ml-[10%] mb-[2.5%] flex justify-center place-items-center place-items-center w-[50%]",
  productImg: "place-items-center self-center w-[65%] rounded-[2%]",
  infoContainer: "text-center w-[55%] grid grid-rows-12 h-full pb-[5%] pr-[3%]",
  name: "2xl:text-2xl lg:text-xl sm:text-base pr-[10%] text-sepia row-span-3 row-start-0 m-[3%]",
  requirementsContainer: "mr-[5%] row-span-10 row-start-5 grid grid-rows-10 pt-[2%]",
  goldContainer: 'align-center',
  levelContainer: 'justify-center flex items-end pb-[2%] w-[50%]',
  levelRequirement: '2xl:text-xl lg:text-lg sm:text-base text-white mr-[8%]',
  levelValue: '2xl:text-3xl lg:text-xl sm:text-lg',
  qtyContainer: 'justify-center flex items-end pb-[2%] w-[50%]',
  qtyRequirement: '2xl:text-xl lg:text-lg sm:text-base text-white mr-[8%]',
  qtyValue: '2xl:text-3xl lg:text-xl sm:text-lg',
  modifierComponent: 'flex flex-wrap justify-center items-center w-full row-span-6 row-start-0',
  modifiersText: '2xl:text-2xl lg:text-base sm:text-sm mr-[2%] ml-[2%] mb-[-3%] mt-[-3%]'
};

const isAntidotePotion = (product: Product): product is AntidotePotion => {
  return typeof product === "object" && product !== null && "recovery_effect" in product;
};

const isEquipment = (product: Product): product is (Weapon | Shield | Helmet | Armor | Boot | Ring | Artifact | HealingPotion | EnhancerPotion) => {
  return typeof product === "object" && product !== null && product !== undefined && "min_lvl" in product;
};

const isIngredient = (product: Product): product is Ingredient => {
  return "qty" in product;
};

const ProductCard: React.FC<Props> = ({ index, product, onClick, isSelected = false, isInCart = false, quantity = 1, handleQuantityChange, handleRemoval, isSelling = false }) => {
  return (
    <>
      <div
        className={`${isInCart ? PRODUCT_CART.mainContainer : PRODUCT_SHOP.mainContainer} ${!isInCart && isSelected ? "bg-[url('/images/shop/product_card_selected.webp')]" : "bg-[url('/images/shop/product_card_unselected.webp')]"}`}
        onClick={onClick}
        data-testid={`${isInCart ? 'cart' : 'shop'}_card_${index}`}>
        <div className={`${isInCart ? PRODUCT_CART.imgContainer : PRODUCT_SHOP.imgContainer} ${!isInCart && isSelected ? "bg-center bg-contain bg-no-repeat bg-[url('/images/shop/product_image_container.webp')]" : null}`}>
          <img data-testid={`${isInCart ? 'cart' : 'shop'}_card_img_${index}`} className={`${isInCart ? PRODUCT_CART.productImg : PRODUCT_SHOP.productImg} ${product.type === 'ingredient' ? 'border border-x-sepia rounded bg-black' : ''}`} src={`https://kaotika.vercel.app${product.image}`} alt="HeaderDivider" />
        </div>
        <div className={isInCart ? PRODUCT_CART.infoContainer : PRODUCT_SHOP.infoContainer}>
          <p data-testid={`${isInCart ? 'cart' : 'shop'}_card_name_${index}`} className={isInCart ? PRODUCT_CART.name : PRODUCT_SHOP.name}>{product.name}</p>
          <div className={isInCart ? PRODUCT_CART.requirementsContainer : PRODUCT_SHOP.requirementsContainer}>
          {!isInCart && (
              <div className={PRODUCT_SHOP.modifierComponent}>
                {isEquipment(product) && product.modifiers &&
                  Object.entries(product.modifiers).map(([key, value], i) => (
                    value !== 0 && (
                      <p key={i} className={PRODUCT_SHOP.modifiersText}>
                        <span className="text-white">{`${key.replace('_', ' ')}: `}</span>{value}
                      </p>
                    )
                  ))
                }
                
                {isAntidotePotion(product) && product.recovery_effect.modifiers &&
                  Object.entries(product.recovery_effect.modifiers).map(([key, value], i) => (
                    value !== 0 && (
                      <p key={i} className={PRODUCT_SHOP.modifiersText}>
                        <span className="text-white">{`${key.replace('_', ' ')}: `}</span>{value}
                      </p>
                    )
                  ))
                }
              </div>
            )}
            <div className="flex justify-around items-end row-span-2 row-start-9">
              <div data-testid={`${isInCart ? 'cart' : 'shop'}_card_value_${index}`} className={isInCart ? PRODUCT_CART.goldContainer : PRODUCT_SHOP.goldContainer}>
                {isSelling ?
                  <GoldComponent amount={Math.floor(product.value / 3) * quantity} />
                  :
                  <GoldComponent amount={isInCart ? product.value * quantity : product.value} />
                }
              </div>
              {
                product.type !== 'ingredient'
                  ? (
                    <div className={isInCart ? PRODUCT_CART.levelContainer : PRODUCT_SHOP.levelContainer}>
                      <p data-testid={`${isInCart ? 'cart' : 'shop'}_card_level_text_${index}`} className={isInCart ? PRODUCT_CART.levelRequirement : PRODUCT_SHOP.levelRequirement}>{`Req. Lvl.`}</p>
                      <p data-testid={`${isInCart ? 'cart' : 'shop'}_card_level_value_${index}`} className={isInCart ? PRODUCT_CART.levelValue : PRODUCT_SHOP.levelValue}>{typeof product === 'object' && product !== null && 'min_lvl' in product ? product.min_lvl : null}</p>
                    </div>
                  )
                  : isSelling
                    ? (
                      <div className={PRODUCT_SHOP.qtyContainer}>
                        <p data-testid={`shop_card_qty_text_${index}`} className={PRODUCT_SHOP.qtyRequirement}>{`Qty.`}</p>
                        <p data-testid={`shop_card_qty_value_${index}`} className={PRODUCT_SHOP.qtyValue}>{isIngredient(product) ? product.qty : null}</p>
                      </div>
                    ) : null
              }
            </div>
          </div>
          {
            isInCart ? (
              <>
                {product.type === 'ingredient' && handleQuantityChange ? (
                  <div data-testid={`cart_card_quantity_${index}`} className="flex flex-col place-items-center justify-center w-full mt-2 h-[33%]">
                    <IncrementDecrement
                      initialValue={quantity}
                      onValueChange={(product, newQuantity) => {
                        if (newQuantity === 0) {
                          handleRemoval(product);
                        } else {
                          handleQuantityChange(product, newQuantity);
                        }
                      }}
                      isInCart={true}
                      product={product}
                      displayButtons={isSelling}
                    />
                  </div>
                ) : (
                  <>
                    {
                      handleRemoval
                        ?
                        <div data-testid={`cart_card_remove_${index}`} className="flex cursor-pointer text-2xl place-items-center justify-center h-[35%] w-[85%] bg-center bg-contain bg-no-repeat bg-[url('/images/shop/store_button.webp')]" onClick={() => handleRemoval(product)}>
                          <p>Remove</p>
                        </div>
                        : null
                    }
                  </>
                )}
              </>
            ) : null
          }
        </div>
      </div>
    </>
  );
};

export default ProductCard;