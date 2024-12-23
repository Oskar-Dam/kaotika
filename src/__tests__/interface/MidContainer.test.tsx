import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Product } from '@/_common/types/Product';
import { Player } from '@/_common/interfaces/Player';
import { MOCK_ARMORS_COLLECTION, MOCK_PLAYER, MOCK_WEAPONS_COLLECTION } from '../mocks';
import MidContainer from '@/components/shop/MidContainer';


const mockProduct: Product = MOCK_WEAPONS_COLLECTION[0];


const mockPlayer: any = MOCK_PLAYER;

describe('MidContainer Component', () => {
  it('should display the image for the product', () => {
    render(
      <MidContainer
        product={mockProduct}
        onBuy={jest.fn()}
        onSell={jest.fn()}
        onAddToCart={jest.fn()}
        player={mockPlayer}
        quantity={1}
        handleQuantityChange={jest.fn()}
        displayBuyButtons={true}
      />
    );

    const image = screen.getByAltText(mockProduct.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.image); 
  });

  it('should display the confirmation modal when "BUY" is clicked', () => {
    render(
      <MidContainer
        product={mockProduct}
        onBuy={jest.fn()}
        onSell={jest.fn()}
        onAddToCart={jest.fn()}
        player={mockPlayer}
        quantity={1}
        handleQuantityChange={jest.fn()}
        displayBuyButtons={true}
      />
    );

    const buyButton = screen.getByText(/BUY/);
    
    fireEvent.click(buyButton);

    const confirmationModal = screen.getByTestId('confirmation_component');
    const modalText = screen.getByText(`x1 ${mockProduct.name}`);
    const confirmButton = screen.getByText(/Confirm/i);
    
    expect(confirmationModal).toBeInTheDocument();
    expect(modalText).toBeInTheDocument();

    fireEvent.click(confirmButton);
    expect(confirmationModal).not.toBeInTheDocument();
  });

  it('should display the confirmation modal when "SELL" is clicked', () => {
    render(
      <MidContainer
        product={mockProduct}
        onBuy={jest.fn()}
        onSell={jest.fn()}
        onAddToCart={jest.fn()}
        player={mockPlayer}
        quantity={1}
        handleQuantityChange={jest.fn()}
        displayBuyButtons={false}
      />
    );

    const sellButton = screen.getByText(/SELL/);

    fireEvent.click(sellButton);

    const confirmationModal = screen.getByTestId('confirmation_component');
    const modalText = screen.getByText(`x1 ${mockProduct.name}`);
    const confirmButton = screen.getByText(/Confirm/i);
    
    expect(confirmationModal).toBeInTheDocument();
    expect(modalText).toBeInTheDocument();

    fireEvent.click(confirmButton);
    expect(confirmationModal).not.toBeInTheDocument();
  });
});
