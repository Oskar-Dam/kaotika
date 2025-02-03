import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/shop/ProductCard';
import { MOCK_INGREDIENTS_COLLECTION, MOCK_SHIELDS_COLLECTION } from '../mocks';
import { Product } from '@/_common/types/Product';
import { Ingredient } from '@/_common/interfaces/Ingredient';

const mockEquipment: Product = MOCK_SHIELDS_COLLECTION[0];
const mockIngredient: Ingredient = MOCK_INGREDIENTS_COLLECTION[0];

describe('ProductCard Component', () => {
  it('should render the equipment correctly in the shop view', () => {
    const mockProps = {
      product: mockEquipment,
      isSelected: false,
      onClick: jest.fn(),
      handleRemoval: jest.fn(),
      isInCart: false,
      handleQuantityChange: jest.fn(),
      quantity: 1,
      index: 1
    };
    render(<ProductCard {...mockProps} />);

    const product = screen.getByTestId(/shop_card_1/)
    const value = screen.getByTestId(/shop_card_value_1/)
    const image = screen.getByTestId(/shop_card_img_1/)
    const level = screen.getByTestId(/shop_card_level_value_1/)
    const name = screen.getByTestId(/shop_card_name_1/)
    const quantityButtons = screen.queryByTestId(/cart_card_quantity_1/)
    const removeButton = screen.queryByTestId(/cart_card_remove_1/)

    expect(product).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(level).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(quantityButtons).toBeNull();
    expect(removeButton).toBeNull();
  })

  it('should render the ingredient correctly in the shop view', () => {
    const mockProps = {
      product: mockIngredient,
      isSelected: false,
      onClick: jest.fn(),
      handleRemoval: jest.fn(),
      isInCart: false,
      handleQuantityChange: jest.fn(),
      quantity: 1,
      index: 1
    };
    render(<ProductCard {...mockProps} />);

    const product = screen.getByTestId(/shop_card_1/)
    const value = screen.getByTestId(/shop_card_value_1/)
    const image = screen.getByTestId(/shop_card_img_1/)
    const level = screen.queryByTestId(/shop_card_level_value_1/)
    const name = screen.getByTestId(/shop_card_name_1/)
    const quantityButtons = screen.queryByTestId(/cart_card_quantity_1/)
    const removeButton = screen.queryByTestId(/cart_card_remove_1/)

    expect(product).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(level).toBeNull();
    expect(name).toBeInTheDocument();
    expect(quantityButtons).toBeNull();
    expect(removeButton).toBeNull();
  })

  it('should render the equipment correctly in the cart view', () => {
    const mockProps = {
      product: mockEquipment,
      isSelected: false,
      onClick: jest.fn(),
      handleRemoval: jest.fn(),
      isInCart: true,
      handleQuantityChange: jest.fn(),
      quantity: 1,
      index: 1
    };
    render(<ProductCard {...mockProps} />);

    const product = screen.getByTestId(/cart_card_1/)
    const value = screen.getByTestId(/cart_card_value_1/)
    const image = screen.getByTestId(/cart_card_img_1/)
    const level = screen.getByTestId(/cart_card_level_value_1/)
    const name = screen.getByTestId(/cart_card_name_1/)
    const quantityButtons = screen.queryByTestId(/cart_card_quantity_1/)
    const removeButton = screen.queryByTestId(/cart_card_remove_1/)

    expect(product).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(level).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(quantityButtons).toBeNull();
    expect(removeButton).toBeInTheDocument();
  })

  it('should render the ingredient correctly in the shop view', () => {
    const mockProps = {
      product: mockIngredient,
      isSelected: false,
      onClick: jest.fn(),
      handleRemoval: jest.fn(),
      isInCart: true,
      handleQuantityChange: jest.fn(),
      quantity: 1,
      index: 1
    };
    render(<ProductCard {...mockProps} />);

    const product = screen.getByTestId(/cart_card_1/)
    const value = screen.getByTestId(/cart_card_value_1/)
    const image = screen.getByTestId(/cart_card_img_1/)
    const level = screen.queryByTestId(/cart_card_level_value_1/)
    const name = screen.getByTestId(/cart_card_name_1/)
    const quantityButtons = screen.queryByTestId(/cart_card_quantity_1/)
    const removeButton = screen.queryByTestId(/cart_card_remove_1/)

    expect(product).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(level).toBeNull();
    expect(name).toBeInTheDocument();
    expect(quantityButtons).toBeInTheDocument();
    expect(removeButton).toBeNull();
  })

  it('should render the ingredient correctly in the cart view', () => {
    const mockProps = {
      product: mockIngredient,
      isSelected: false,
      onClick: jest.fn(),
      handleRemoval: jest.fn(),
      isInCart: true,
      handleQuantityChange: jest.fn(),
      quantity: 1,
      index: 1
    };
    render(<ProductCard {...mockProps} />);


    const quantityButtons = screen.queryByTestId(/cart_card_quantity_1/)

    expect(quantityButtons).toBeInTheDocument();
  });
});