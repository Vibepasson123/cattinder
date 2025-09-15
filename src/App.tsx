import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import {StackSwipeScreen} from './screens/SwipeScreen/StackSwipeScreen';
import { MatchesScreen } from './screens/MatchesScreen/MatchesScreen';
import { ProfileScreen } from './screens/ProfileScreen/ProfileScreen';
import { SplashScreen } from './components/ui/SplashScreen';
import { colors } from './utils/constants';
import PawsAnimation from '../assets/lottie/PawsAnimation.json';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabBar } from './components/navigation/BottomNavigation';


const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const Content = styled.View`
  flex: 1;
`;


const Tab = createBottomTabNavigator();
const SwipeStack = createNativeStackNavigator();

function SwipeStackNavigator() {
  return (
    <SwipeStack.Navigator screenOptions={{ headerShown: false }}>
      <SwipeStack.Screen name="SwipeHome" component={StackSwipeScreen} />
    </SwipeStack.Navigator>
  );
}

const screenOptions = () => ({
  headerShown: false,
});

function AppTabBar({ state, navigation }: any) {
  const activeTab = state.routes[state.index]?.name as 'swipe' | 'matches' | 'profile';

  const handleTabPress = (tab: 'swipe' | 'matches' | 'profile') => {
    navigation.navigate(tab);
  };

  return (
    <BottomTabBar
      activeTab={activeTab}
      onTabPress={handleTabPress}
    />
  );
}

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return (
      <SplashScreen 
        onFinish={handleSplashFinish}
        lottieSource={PawsAnimation}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <NavigationContainer>
        <Container>
          <Content>
            <Tab.Navigator screenOptions={screenOptions} tabBar={AppTabBar}>
              <Tab.Screen name="swipe" component={SwipeStackNavigator} />
              <Tab.Screen name="matches" component={MatchesScreen} />
              <Tab.Screen name="profile" component={ProfileScreen} />
            </Tab.Navigator>
          </Content>
        </Container>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
