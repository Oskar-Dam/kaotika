import { Armor } from "@/_common/interfaces/Armor";
import { Artifact } from "@/_common/interfaces/Artifact";
import { Boot } from "@/_common/interfaces/Boot";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Ingredient } from "@/_common/interfaces/Ingredient";
import { Ring } from "@/_common/interfaces/Ring";
import { Shield } from "@/_common/interfaces/Shield";
import { Weapon } from "@/_common/interfaces/Weapon";
import GoldComponent from "./GoldComponent";
import { PRODUCT_CART, PRODUCT_SHOP } from "@/constants/constants";

interface Product {
    product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient;
    isSelected: boolean;
    onClick: () => void;
    isInCart?: boolean
}

const ProductCard: React.FC<Product> = ({ product, onClick, isSelected, isInCart = false }) => {
    return (
        <>
            <div
                className={`${isInCart ? PRODUCT_CART.mainContainer : PRODUCT_SHOP.mainContainer} ${!isInCart && isSelected ? "bg-[url('/images/shop/product_card_selected.webp')]" : "bg-[url('/images/shop/product_card_unselected.webp')]"}`}
                onClick={onClick}
            >
                <div className={isInCart ? PRODUCT_CART.imgContainer : PRODUCT_SHOP.imgContainer}>
                    <img className={isInCart ? PRODUCT_CART.productImg : PRODUCT_SHOP.productImg} src={`https://kaotika.vercel.app${product.image}`} alt="HeaderDivider" />
                </div>
                <div className={isInCart ? PRODUCT_CART.infoContainer : PRODUCT_SHOP.infoContainer}>
                    <p className={isInCart ? PRODUCT_CART.name : PRODUCT_SHOP.name}>{product.name}</p>
                    <div className={isInCart ? PRODUCT_CART.requirementsContainer : PRODUCT_SHOP.requirementsContainer}>
                        <div className={isInCart ? PRODUCT_CART.goldContainer : PRODUCT_SHOP.goldContainer}>
                            <GoldComponent amount={product.value} />
                        </div>
                        {
                            product.type !== 'ingredient'
                                ? (
                                    <div className={isInCart ? PRODUCT_CART.levelContainer : PRODUCT_SHOP.levelContainer}>
                                        <p className={isInCart ? PRODUCT_CART.levelRequirement : PRODUCT_SHOP.levelRequirement}>{`Req. Lvl.`}</p>
                                        <p className={isInCart ? PRODUCT_CART.levelValue : PRODUCT_SHOP.levelValue}>{product.min_lvl}</p>
                                    </div>
                                )
                                : null
                        }
                        {
                            isInCart ? (
                                //ADD CART BUTTONS HERE
                                <>
                                </>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;