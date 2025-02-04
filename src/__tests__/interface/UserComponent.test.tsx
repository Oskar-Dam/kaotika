import { render, screen } from '@testing-library/react';
import UserComponent from '@/components/shop/UserComponent';
import { MOCK_HELMET_COLLECTION } from '../mocks';

describe('DisplayPlayerData', () => {
  it('Should display the player\'s current gold amount', () => {
    const mockPlayer = { name: "Reik", gold: 5725, level: 17 };

    render(<UserComponent name={mockPlayer.name} gold={mockPlayer.gold} level={mockPlayer.level} />);

    const goldDisplay = screen.getByText(/5725/);

    // Check if the player's current gold ammount is displayed correctly as 5725
    expect(goldDisplay).toBeInTheDocument();
  });
});

describe('DynamicGoldUpdateDisplay', () => {
  it('Should dynamically update the player\'s gold value after a purchase', () => {
    const mockPlayer = { name: "Reik", gold: 5725, level: 17 };
    const mockProduct = MOCK_HELMET_COLLECTION[0];

    render(<UserComponent name={mockPlayer.name} gold={mockPlayer.gold} level={mockPlayer.level} />);

    const goldDisplay = screen.getByText(/5725/);
    expect(goldDisplay).toBeInTheDocument();

    //Inside helmet collection, the value of the first helmet is 150
    const updatedGold = mockPlayer.gold - mockProduct.value;

    render(<UserComponent name={mockPlayer.name} gold={updatedGold} level={mockPlayer.level} />);

    //Player gold(5725) - helmet value(150) -> The new Player gold value should be 5575
    const updatedGoldDisplay = screen.getByText(/5575/);
    expect(updatedGoldDisplay).toBeInTheDocument();
  });
});