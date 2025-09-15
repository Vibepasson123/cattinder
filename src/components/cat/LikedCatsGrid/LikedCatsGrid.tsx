import React from 'react';
import { FlatList, Dimensions, Image, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { colors, spacing } from '../../../utils/constants';
import { CatImage as CatImageType } from '../../../types/api.types';

const { width } = Dimensions.get('window');
const itemWidth = (width - spacing.sm * 3) / 2;

interface LikedCatsGridProps {
  likedCats: CatImageType[];
  loading: boolean;
  hasMore: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SpinnerContainer = styled.View`
  padding: ${spacing.lg}px;
  align-items: center;
  justify-content: center;
`;

const CatImage = styled(Image)`
  width: ${itemWidth}px;
  height: ${itemWidth}px;
  border-radius: 12px;
  margin: ${spacing.xs}px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${spacing.xl}px;
`;

const EmptyText = styled.Text`
  font-size: 18px;
  color: ${colors.neutral};
  text-align: center;
`;

export const LikedCatsGrid: React.FC<LikedCatsGridProps> = ({
  likedCats,
  loading,
  hasMore,
  onRefresh,
  onLoadMore,
}) => {
  const renderCatItem = ({ item }: { item: CatImageType }) => (
    <CatImage source={{ uri: item.url }} resizeMode="cover" />
  );

  if (loading && likedCats.length === 0) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator size="large" color={colors.primary} />
        </LoadingContainer>
      </Container>
    );
  }

  if (likedCats.length === 0) {
    return (
      <Container>
        <EmptyContainer>
          <EmptyText>No liked cats found yet!</EmptyText>
        </EmptyContainer>
      </Container>
    );
  }

  const handleEndReached = () => {
    if (hasMore && !loading) {
      onLoadMore();
    }
  };

  return (
    <Container>
      <FlatList
        data={likedCats}
        renderItem={renderCatItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: spacing.sm }}
        showsVerticalScrollIndicator={false}
        refreshing={loading && likedCats.length === 0}
        onRefresh={onRefresh}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && likedCats.length > 0 ? (
            <SpinnerContainer>
              <ActivityIndicator size="large" color={colors.primary} />
            </SpinnerContainer>
          ) : null
        }
      />
    </Container>
  );
};