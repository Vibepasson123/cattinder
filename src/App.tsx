import React, {  } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, View } from 'react-native';
import { Text } from 'react-native-svg';




const App: React.FC = () => {

 

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content"  />
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <Text>Hello</Text>
      </View>
    </SafeAreaProvider>
  );
};

export default App;
