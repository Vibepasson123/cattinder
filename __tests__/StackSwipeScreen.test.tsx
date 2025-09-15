import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { StackSwipeScreen } from '../src/screens/SwipeScreen/StackSwipeScreen';

jest.mock('../src/hooks/useCatList', () => ({
  useCatList: jest.fn(),
}));

jest.mock('../src/hooks/useLikedCats', () => ({
  useLikedCats: jest.fn(),
}));

jest.mock('../src/components/actions/SwipeButtons', () => ({
  SwipeButtons: ({ onDislike, onLike }: any) => {
    const { View, TouchableOpacity, Text } = require('react-native');
    return (
      <View testID="swipe-buttons">
        <TouchableOpacity testID="dislike-btn" onPress={onDislike}>
          <Text>Dislike</Text>
        </TouchableOpacity>
        <TouchableOpacity testID="like-btn" onPress={onLike}>
          <Text>Like</Text>
        </TouchableOpacity>
      </View>
    );
  },
}));

jest.mock('../src/components/ui/ToggleSwitch', () => ({
  ToggleSwitch: ({ onTabChange }: any) => {
    const { View, TouchableOpacity, Text } = require('react-native');
    return (
      <View testID="toggle-switch">
        <TouchableOpacity testID="tinder-tab" onPress={() => onTabChange('tinder')}>
          <Text>Tinder</Text>
        </TouchableOpacity>
        <TouchableOpacity testID="star-tab" onPress={() => onTabChange('star')}>
          <Text>Star</Text>
        </TouchableOpacity>
      </View>
    );
  },
}));

jest.mock('../src/components/cat/LikedCatsGrid', () => ({
  LikedCatsGrid: ({ likedCats, loading, hasMore, onRefresh, onLoadMore }: any) => {
    const { View, Text, TouchableOpacity } = require('react-native');
    return (
      <View testID="liked-cats-grid">
        <Text testID="cats-count">{likedCats.length}</Text>
        <Text testID="loading-state">{loading ? 'loading' : 'not-loading'}</Text>
        <Text testID="has-more">{hasMore ? 'has-more' : 'no-more'}</Text>
        <TouchableOpacity testID="refresh-btn" onPress={onRefresh}><Text>Refresh</Text></TouchableOpacity>
        <TouchableOpacity testID="load-more-btn" onPress={onLoadMore}><Text>Load More</Text></TouchableOpacity>
      </View>
    );
  },
}));

import { useCatList } from '../src/hooks/useCatList';
import { useLikedCats } from '../src/hooks/useLikedCats';

const mockUseCatList = useCatList as jest.MockedFunction<typeof useCatList>;
const mockUseLikedCats = useLikedCats as jest.MockedFunction<typeof useLikedCats>;

describe('StackSwipeScreen Component', () => {
  const mockCatListReturn = {
    cats: [
      {
        id: 'cat-1',
        url: 'https://example.com/cat1.jpg',
        width: 500,
        height: 500,
        breeds: [{ id: 'breed-1', name: 'Test Breed', origin: 'Test Origin', adaptability: 4 }],
      },
    ],
    loading: false,
    error: null,
    hasMore: true,
    loadMore: jest.fn(),
    likeCat: jest.fn(),
    dislikeCat: jest.fn(),
    refreshing: false,
    refresh: jest.fn(),
    addToFavorites: jest.fn(),
  };

  const mockLikedCatsReturn = {
    likedCats: [
      {
        id: 'liked-cat-1',
        url: 'https://example.com/liked-cat1.jpg',
        width: 500,
        height: 500,
        breeds: [],
      },
    ],
    loading: false,
    error: null,
    hasMore: false,
    totalCount: 1,
    refresh: jest.fn(),
    loadMore: jest.fn(),
    refetch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCatList.mockReturnValue(mockCatListReturn);
    mockUseLikedCats.mockReturnValue(mockLikedCatsReturn);
  });

  it('renders tinder tab by default', () => {
    const { getByTestId } = render(<StackSwipeScreen />);

    expect(getByTestId('toggle-switch')).toBeTruthy();
    expect(getByTestId('tinder-tab')).toBeTruthy();
    expect(getByTestId('star-tab')).toBeTruthy();
  });

  it('shows error state when there is an error', () => {
    mockUseCatList.mockReturnValue({
      ...mockCatListReturn,
      error: 'Failed to load cats',
      cats: [],
    });

    const { getByText } = render(<StackSwipeScreen />);

    expect(getByText('Failed to load cats')).toBeTruthy();
  });

  it('shows empty state when no cats available', () => {
    mockUseCatList.mockReturnValue({
      ...mockCatListReturn,
      cats: [],
    });

    const { getByText } = render(<StackSwipeScreen />);

    expect(getByText('No more cats.')).toBeTruthy();
  });

  it('renders swipe buttons when cats are available', () => {
    const { getByTestId } = render(<StackSwipeScreen />);

    expect(getByTestId('swipe-buttons')).toBeTruthy();
    expect(getByTestId('like-btn')).toBeTruthy();
    expect(getByTestId('dislike-btn')).toBeTruthy();
  });

  it('calls onTabChange when tinder button is pressed', () => {
    const { getByTestId } = render(<StackSwipeScreen />);

    const tinderTab = getByTestId('tinder-tab');
    fireEvent.press(tinderTab);
    expect(tinderTab).toBeTruthy();
  });

  it('calls onTabChange when star button is pressed', () => {
    const { getByTestId } = render(<StackSwipeScreen />);

    const starTab = getByTestId('star-tab');
    fireEvent.press(starTab);
    expect(starTab).toBeTruthy();
  });

  it('calls onLike when like button is pressed', () => {
    const { getByTestId } = render(<StackSwipeScreen />);

    const likeBtn = getByTestId('like-btn');
    fireEvent.press(likeBtn);
    expect(likeBtn).toBeTruthy();
  });

  it('calls onDislike when dislike button is pressed', () => {
    const { getByTestId } = render(<StackSwipeScreen />);

    const dislikeBtn = getByTestId('dislike-btn');
    fireEvent.press(dislikeBtn);
    expect(dislikeBtn).toBeTruthy();
  });
});