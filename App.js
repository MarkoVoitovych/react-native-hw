import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import fonts from './src/assets/fonts/fonts';
import colors from './src/assets/colors';
import { RegistrationScreen } from './src/screens/RegistrationScreen';
import { LoginScreen } from './src/screens/LoginScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await (async () => {
          await Font.loadAsync(fonts);
        })();
      } catch (e) {
        Alert.alert(e.message);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    })();
  }, []);

  if (!isReady) {
    return null;
  } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <LoginScreen />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY_BG,
    justifyContent: 'flex-end',
  },
});
