import ProductCard from "./ProductCard";
import { Cart, Product } from "@/_common/types/Product";

interface Props {
	cart: Cart;
	onRemoveFromCart: (product: Product) => void;
	handleQuantityChange: (product: Product, quantity: number) => void;
	quantity: number;
};

const CartProductsContainer: React.FC<Props> = ({ cart, quantity, handleQuantityChange, onRemoveFromCart }) => {
	return (
		<div className=" w-[100%] h-full place-items-center bg-gray-950 bg-opacity-50
			overflow-y-auto
			[&::-webkit-scrollbar]:w-2
			[&::-webkit-scrollbar-track]:bg-gray-950
			[&::-webkit-scrollbar-thumb]:bg-gray-800">
			{cart.map((product, i) => (
				<ProductCard key={i.toString()} index={i} product={product.product} quantity={product.quantity} isSelected={false} isInCart={true} handleRemoval={() => onRemoveFromCart(product.product)} handleQuantityChange={handleQuantityChange} onClick={() => null} />
			))}
		</div>
	);
};

export default CartProductsContainer;