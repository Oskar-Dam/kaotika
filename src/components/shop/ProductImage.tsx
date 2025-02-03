import React from "react";

interface Props {
	imageSrc: string;
	altText: string;
	isMagical?: boolean;
};

const ProductImage: React.FC<Props> = ({ imageSrc, altText, isMagical = false }) => (
	<>
		<img src={imageSrc} alt={altText} className={`h-auto max-w-full rounded-[2%] ${isMagical ? "border border-x-sepia rounded bg-black" : ""}`} />
	</>
);

export default ProductImage;