import React from 'react';
import { render, waitFor, act } from '@testing-library/react-native';
import { SplashScreen } from '../src/components/ui/SplashScreen/SplashScreen';

jest.mock('lottie-react-native', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: ({ onAnimationFinish, ...props }: any) => {

      setTimeout(() => {
        if (onAnimationFinish) {
          onAnimationFinish();
        }
      }, 100);
      return <View testID="lottie-view" {...props} />;
    },
  };
});

describe('SplashScreen', () => {
  const mockOnFinish = jest.fn();
  const mockLottieSource = { test: 'animation' };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders correctly with lottie source', () => {
    const { getByTestId } = render(
      <SplashScreen onFinish={mockOnFinish} lottieSource={mockLottieSource} />
    );

    expect(getByTestId('lottie-view')).toBeTruthy();
  });

  it('renders correctly without lottie source', () => {
    const { queryByTestId } = render(
      <SplashScreen onFinish={mockOnFinish} />
    );

    expect(queryByTestId('lottie-view')).toBeNull();
  });

  it('calls onFinish after 3 seconds', async () => {
    render(
      <SplashScreen onFinish={mockOnFinish} lottieSource={mockLottieSource} />
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(mockOnFinish).toHaveBeenCalledTimes(1);
    });
  });

  it('does not call onFinish before 3 seconds', () => {
    render(
      <SplashScreen onFinish={mockOnFinish} lottieSource={mockLottieSource} />
    );

    act(() => {
      jest.advanceTimersByTime(2900);
    });

    expect(mockOnFinish).not.toHaveBeenCalled();
  });

  it('cleans up timer on unmount', () => {
    const { unmount } = render(
      <SplashScreen onFinish={mockOnFinish} lottieSource={mockLottieSource} />
    );

    unmount();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockOnFinish).not.toHaveBeenCalled();
  });
});
