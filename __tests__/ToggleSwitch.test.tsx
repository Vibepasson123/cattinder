import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ToggleSwitch } from '../src/components/ui/ToggleSwitch/ToggleSwitch';

describe('ToggleSwitch Component', () => {
  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders both tinder and star buttons', () => {
    const { getByTestId } = render(
      <ToggleSwitch activeTab="tinder" onTabChange={mockOnTabChange} />
    );

    expect(getByTestId('tinder-button')).toBeTruthy();
    expect(getByTestId('star-button')).toBeTruthy();
  });

  it('calls onTabChange when tinder button is pressed', () => {
    const { getByTestId } = render(
      <ToggleSwitch activeTab="star" onTabChange={mockOnTabChange} />
    );

    const tinderButton = getByTestId('tinder-button');
    fireEvent.press(tinderButton);

    expect(mockOnTabChange).toHaveBeenCalledWith('tinder');
  });

  it('calls onTabChange when star button is pressed', () => {
    const { getByTestId } = render(
      <ToggleSwitch activeTab="tinder" onTabChange={mockOnTabChange} />
    );

    const starButton = getByTestId('star-button');
    fireEvent.press(starButton);

    expect(mockOnTabChange).toHaveBeenCalledWith('star');
  });

  it('handles multiple button presses', () => {
    const { getByTestId } = render(
      <ToggleSwitch activeTab="tinder" onTabChange={mockOnTabChange} />
    );

    const tinderButton = getByTestId('tinder-button');
    const starButton = getByTestId('star-button');
    fireEvent.press(starButton);
    fireEvent.press(tinderButton);
    fireEvent.press(starButton);

    expect(mockOnTabChange).toHaveBeenCalledTimes(3);
    expect(mockOnTabChange).toHaveBeenNthCalledWith(1, 'star');
    expect(mockOnTabChange).toHaveBeenNthCalledWith(2, 'tinder');
    expect(mockOnTabChange).toHaveBeenNthCalledWith(3, 'star');
  });
});