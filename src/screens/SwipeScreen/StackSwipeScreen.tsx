import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { SwipeButtons } from '../../components/actions/SwipeButtons';
import { CatInfoOverlay } from '../../components/cat/CatInfoOverlay';
import { LikedCatsGrid } from '../../components/cat/LikedCatsGrid';
import { SwipeableCatCard, SwipeableCatCardRef } from '../../components/cat/SwipeableCatCard';
import { ToggleSwitch } from '../../components/ui/ToggleSwitch';
import { useCatList } from '../../hooks/useCatList';
import { useLikedCats } from '../../hooks/useLikedCats';
import { CatImage } from '../../types/api.types';
import { colors, spacing } from '../../utils/constants';
import { SwipeScreenProps } from './SwipeScreen.types';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Content = styled.View`
  flex: 1;
  padding-top: ${spacing.lg}px;
`;

const CardStackContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-horizontal: ${spacing.md}px;
`;

const CardWrapper = styled.View<{ zIndex: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: ${props => props.zIndex};
`;


const ErrorText = styled.Text`
  text-align: center;
  font-size: 18px;
  color: ${colors.error};
  margin-top: ${spacing.xl}px;
`;

const EmptyText = styled.Text`
  text-align: center;
  font-size: 18px;
  color: ${colors.neutral};
  margin-top: ${spacing.xl}px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CardStyle = {
  width: '94%',
  height: '88%',
  alignSelf: 'center',
  shadowColor: colors.black,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
};

export const StackSwipeScreen: React.FC<SwipeScreenProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState<'tinder' | 'star'>('tinder');
  const currentCardRef = useRef<SwipeableCatCardRef>(null);
  const nextCardRef = useRef<SwipeableCatCardRef>(null);
  
  const {
    cats,
    loading,
    error,
    hasMore,
    loadMore,
    likeCat,
    dislikeCat,
  } = useCatList();

  const {
    likedCats,
    loading: likedCatsLoading,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error: likedCatsError,
    hasMore: hasMoreLikedCats,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    totalCount: totalLikedCats,
    refresh: refreshLikedCats,
    loadMore: loadMoreLikedCats,
  } = useLikedCats({ userId: 'cat-tinder-user', autoLoad: false, pageSize: 10 });


  useEffect(() => {
    if (currentIndex >= cats.length - 2 && hasMore && !loading) {
      loadMore();
    }
  }, [currentIndex, cats.length, hasMore, loading, loadMore]);

  useEffect(() => {
    if (activeTab === 'star') {
      refreshLikedCats();
    }
  }, [activeTab, refreshLikedCats]);

  const handleTabChange = (tab: 'tinder' | 'star') => {
    setActiveTab(tab);
  };

  const handleDislike = async () => {
    if (cats.length > 0 && currentIndex < cats.length && !isAnimating) {
      currentCardRef.current?.swipeLeft();
    }
  };

  const handleLike = async () => {
    if (cats.length > 0 && currentIndex < cats.length && !isAnimating) {
      currentCardRef.current?.swipeRight();
    }
  };

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (isAnimating || currentIndex >= cats.length) return;
    
    setIsAnimating(true);
    
    const currentCat = cats[currentIndex];
    setCurrentIndex(prev => prev + 1);

    if (direction === 'left') {
      dislikeCat(currentCat.id);
    } else {
      likeCat(currentCat.id);
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const renderCard = (cat: CatImage, index: number, isCurrent: boolean) => {
    if (index >= cats.length) return null;

    const breedInfo = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0] : null;
    const breedName = breedInfo?.name || 'Unknown Breed';
    const breedOrigin = breedInfo?.origin || 'Unknown Origin';
    
    return (
      <CardWrapper key={cat.id} zIndex={isCurrent ? 2 : 1}>
        <SwipeableCatCard
          ref={isCurrent ? currentCardRef : (index === currentIndex + 1 ? nextCardRef : null)}
          cat={{
            image: cat,
            breed: breedInfo || {
              id: cat.id,
              name: breedName,
              origin: breedOrigin,
            }
          }}
          onSwipe={handleSwipe}
          onPress={() => {}}
          style={CardStyle}
        >
          <CatInfoOverlay
            breedName={breedName}
            origin={breedOrigin}
            adaptability={breedInfo?.adaptability || 3}
          />
        </SwipeableCatCard>
      </CardWrapper>
    );
  };

  if (error && cats.length === 0) {
    return (
      <Container>
        <Content>
          <ErrorText>{error}</ErrorText>
        </Content>
      </Container>
    );
  }

  if (loading && cats.length === 0) {
    return (
      <Container>
        <Content>
          <LoadingContainer>
            <ActivityIndicator size="large" color={colors.primary} />
          </LoadingContainer>
        </Content>
      </Container>
    );
  }
  if (cats.length === 0) {
    return (
      <Container>
        <Content>
          <EmptyText>No more cats.</EmptyText>
        </Content>
      </Container>
    );
  }
  if (activeTab === 'star') {
    return (
      <Container>
        <Content>
          <ToggleSwitch activeTab={activeTab} onTabChange={handleTabChange} />
          <LikedCatsGrid
            likedCats={likedCats}
            loading={likedCatsLoading}
            hasMore={hasMoreLikedCats}
            onRefresh={refreshLikedCats}
            onLoadMore={loadMoreLikedCats}
          />
        </Content>
      </Container>
    );
  }
  return (
    <Container>
      <Content>
        <ToggleSwitch activeTab={activeTab} onTabChange={handleTabChange} />
        
        <CardStackContainer>
          {currentIndex < cats.length && renderCard(cats[currentIndex], currentIndex, true)}
          {currentIndex + 1 < cats.length && renderCard(cats[currentIndex + 1], currentIndex + 1, false)}
        </CardStackContainer>
        
        <SwipeButtons
          onDislike={handleDislike}
          onLike={handleLike}
        />
      </Content>
    </Container>
  );
};
