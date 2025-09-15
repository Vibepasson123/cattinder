import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SwipeButtons } from '../src/components/actions/SwipeButtons/SwipeButtons';

describe('SwipeButtons Component', () => {
  const mockOnDislike = jest.fn();
  const mockOnLike = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders both dislike and like buttons', () => {
    const { getByTestId } = render(
      <SwipeButtons onDislike={mockOnDislike} onLike={mockOnLike} />
    );

    expect(getByTestId('dislike-button')).toBeTruthy();
    expect(getByTestId('like-button')).toBeTruthy();
  });

  it('calls onDislike when dislike button is pressed', () => {
    const { getByTestId } = render(
      <SwipeButtons onDislike={mockOnDislike} onLike={mockOnLike} />
    );

    const dislikeButton = getByTestId('dislike-button');
    fireEvent.press(dislikeButton);

    expect(mockOnDislike).toHaveBeenCalledTimes(1);
  });

  it('calls onLike when like button is pressed', () => {
    const { getByTestId } = render(
      <SwipeButtons onDislike={mockOnDislike} onLike={mockOnLike} />
    );

    const likeButton = getByTestId('like-button');
    fireEvent.press(likeButton);

    expect(mockOnLike).toHaveBeenCalledTimes(1);
  });

  it('does not call onDislike when like button is pressed', () => {
    const { getByTestId } = render(
      <SwipeButtons onDislike={mockOnDislike} onLike={mockOnLike} />
    );

    const likeButton = getByTestId('like-button');
    fireEvent.press(likeButton);

    expect(mockOnDislike).not.toHaveBeenCalled();
  });

  it('does not call onLike when dislike button is pressed', () => {
    const { getByTestId } = render(
      <SwipeButtons onDislike={mockOnDislike} onLike={mockOnLike} />
    );

    const dislikeButton = getByTestId('dislike-button');
    fireEvent.press(dislikeButton);

    expect(mockOnLike).not.toHaveBeenCalled();
  });

  it('handles multiple rapid button presses', () => {
    const { getByTestId } = render(
      <SwipeButtons onDislike={mockOnDislike} onLike={mockOnLike} />
    );

    const likeButton = getByTestId('like-button');
    const dislikeButton = getByTestId('dislike-button');
    fireEvent.press(likeButton);
    fireEvent.press(dislikeButton);
    fireEvent.press(likeButton);
    expect(mockOnLike).toHaveBeenCalledTimes(2);
    expect(mockOnDislike).toHaveBeenCalledTimes(1);
  });
});

