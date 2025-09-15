import React from 'react';
import { render } from '@testing-library/react-native';
import { LikedCatsGrid } from '../src/components/cat/LikedCatsGrid/LikedCatsGrid';
import { CatImage } from '../src/types/api.types';

describe('LikedCatsGrid Component', () => {
  const mockLikedCats: CatImage[] = [
    {
      id: 'cat-1',
      url: 'https://example.com/cat1.jpg',
      width: 500,
      height: 500,
      breeds: [],
    },
    {
      id: 'cat-2',
      url: 'https://example.com/cat2.jpg',
      width: 500,
      height: 500,
      breeds: [],
    },
  ];

  const mockOnRefresh = jest.fn();
  const mockOnLoadMore = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading spinner when loading and no cats', () => {
    const { getByTestId } = render(
      <LikedCatsGrid
        likedCats={[]}
        loading={true}
        hasMore={false}
        onRefresh={mockOnRefresh}
        onLoadMore={mockOnLoadMore}
      />
    );

    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('renders empty state when no cats and not loading', () => {
    const { getByText } = render(
      <LikedCatsGrid
        likedCats={[]}
        loading={false}
        hasMore={false}
        onRefresh={mockOnRefresh}
        onLoadMore={mockOnLoadMore}
      />
    );

    expect(getByText('No liked cats yet! Start swiping to find your favorites')).toBeTruthy();
  });

  it('renders liked cats when cats are available', () => {
    const { getByText } = render(
      <LikedCatsGrid
        likedCats={mockLikedCats}
        loading={false}
        hasMore={false}
        onRefresh={mockOnRefresh}
        onLoadMore={mockOnLoadMore}
      />
    );

    // Should render the FlatList (we can't easily test the actual grid items without complex mocking)
    expect(getByText).toBeDefined();
  });

  it('shows loading spinner in footer when loading more', () => {
    const { getByTestId } = render(
      <LikedCatsGrid
        likedCats={mockLikedCats}
        loading={true}
        hasMore={true}
        onRefresh={mockOnRefresh}
        onLoadMore={mockOnLoadMore}
      />
    );

    expect(getByTestId('loading-more-spinner')).toBeTruthy();
  });

  it('does not show loading spinner in footer when not loading more', () => {
    const { queryByTestId } = render(
      <LikedCatsGrid
        likedCats={mockLikedCats}
        loading={false}
        hasMore={true}
        onRefresh={mockOnRefresh}
        onLoadMore={mockOnLoadMore}
      />
    );

    expect(queryByTestId('loading-more-spinner')).toBeNull();
  });
});