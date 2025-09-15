import React from 'react';
import { render } from '@testing-library/react-native';
import { CatInfoOverlay } from '../src/components/cat/CatInfoOverlay/CatInfoOverlay';

describe('CatInfoOverlay Component', () => {
  it('renders breed name and origin correctly', () => {
    const { getByText } = render(
      <CatInfoOverlay
        breedName="Persian"
        origin="Iran"
        adaptability={4}
      />
    );

    expect(getByText('Persian')).toBeTruthy();
    expect(getByText('Iran')).toBeTruthy();
  });

  it('displays adaptability number', () => {
    const { getByText } = render(
      <CatInfoOverlay
        breedName="Maine Coon"
        origin="United States"
        adaptability={5}
      />
    );

    expect(getByText('5')).toBeTruthy();
  });

  it('handles different adaptability values', () => {
    const { getByText, rerender } = render(
      <CatInfoOverlay
        breedName="Test Breed"
        origin="Test Origin"
        adaptability={1}
      />
    );

    expect(getByText('1')).toBeTruthy();

    rerender(
      <CatInfoOverlay
        breedName="Test Breed"
        origin="Test Origin"
        adaptability={3}
      />
    );

    expect(getByText('3')).toBeTruthy();
  });

  it('handles long breed names and origins', () => {
    const longBreedName = 'Very Long Breed Name That Might Overflow';
    const longOrigin = 'Very Long Country Name That Might Also Overflow';

    const { getByText } = render(
      <CatInfoOverlay
        breedName={longBreedName}
        origin={longOrigin}
        adaptability={2}
      />
    );

    expect(getByText(longBreedName)).toBeTruthy();
    expect(getByText(longOrigin)).toBeTruthy();
  });

  it('handles special characters in breed name and origin', () => {
    const { getByText } = render(
      <CatInfoOverlay
        breedName="Siamese (Thai)"
        origin="Thailand 🇹🇭"
        adaptability={4}
      />
    );

    expect(getByText('Siamese (Thai)')).toBeTruthy();
    expect(getByText('Thailand 🇹🇭')).toBeTruthy();
  });

  it('handles zero adaptability', () => {
    const { getByText } = render(
      <CatInfoOverlay
        breedName="Test Breed"
        origin="Test Origin"
        adaptability={0}
      />
    );

    expect(getByText('0')).toBeTruthy();
  });

  it('handles high adaptability values', () => {
    const { getByText } = render(
      <CatInfoOverlay
        breedName="Test Breed"
        origin="Test Origin"
        adaptability={10}
      />
    );

    expect(getByText('10')).toBeTruthy();
  });
});

