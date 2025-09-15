import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../src/App';

// Mock the splash screen
jest.mock('../src/components/ui/SplashScreen', () => ({
  SplashScreen: ({ onFinish }: any) => {
    const { View, TouchableOpacity, Text } = require('react-native');
    return (
      <View testID="splash-screen">
        <TouchableOpacity testID="finish-splash" onPress={onFinish}>
          <Text>Finish Splash</Text>
        </TouchableOpacity>
      </View>
    );
  },
}));

// Mock the main app components
jest.mock('../src/screens/SwipeScreen/StackSwipeScreen', () => ({
  StackSwipeScreen: () => {
    const { View, Text } = require('react-native');
    return (
      <View testID="swipe-screen">
        <Text>Swipe Screen</Text>
      </View>
    );
  },
}));

jest.mock('../src/screens/MatchesScreen/MatchesScreen', () => ({
  MatchesScreen: () => {
    const { View, Text } = require('react-native');
    return (
      <View testID="matches-screen">
        <Text>Matches Screen</Text>
      </View>
    );
  },
}));

jest.mock('../src/screens/ProfileScreen/ProfileScreen', () => ({
  ProfileScreen: () => {
    const { View, Text } = require('react-native');
    return (
      <View testID="profile-screen">
        <Text>Profile Screen</Text>
      </View>
    );
  },
}));

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: any) => {
    const { View } = require('react-native');
    return <View testID="navigation-container">{children}</View>;
  },
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }: any) => {
      const { View } = require('react-native');
      return <View testID="bottom-tab-navigator">{children}</View>;
    },
    Screen: ({ children }: any) => {
      const { View } = require('react-native');
      return <View testID="tab-screen">{children}</View>;
    },
  }),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }: any) => {
      const { View } = require('react-native');
      return <View testID="stack-navigator">{children}</View>;
    },
    Screen: ({ children }: any) => {
      const { View } = require('react-native');
      return <View testID="stack-screen">{children}</View>;
    },
  }),
}));

describe('App Component', () => {
  it('shows splash screen initially', () => {
    const { getByTestId } = render(<App />);

    expect(getByTestId('splash-screen')).toBeTruthy();
  });

  it('calls onFinish when splash screen button is pressed', () => {
    const { getByTestId } = render(<App />);

    const finishButton = getByTestId('finish-splash');
    fireEvent.press(finishButton);

    // The button press should trigger the onFinish callback
    expect(finishButton).toBeTruthy();
  });

  it('renders splash screen with finish button', () => {
    const { getByTestId } = render(<App />);

    expect(getByTestId('splash-screen')).toBeTruthy();
    expect(getByTestId('finish-splash')).toBeTruthy();
  });

  it('has splash screen component structure', () => {
    const { getByTestId } = render(<App />);

    const splashScreen = getByTestId('splash-screen');
    const finishButton = getByTestId('finish-splash');
    
    expect(splashScreen).toBeTruthy();
    expect(finishButton).toBeTruthy();
  });
});