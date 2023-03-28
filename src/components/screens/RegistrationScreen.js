import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

import { smallDevice } from '../../utils/defaults';
import { Btn } from '../common/Btn';
import { Input } from '../common/Input';
import { Password } from '../common/Password';
import { AddAvatar } from '../common/AddAvatar';

import colors from '../../assets/colors';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const initFormState = {
  avatarUrl: '',
  login: '',
  email: '',
  password: '',
};

export const RegistrationScreen = () => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [form, setForm] = useState(initFormState);

  const handleInputChange = ({ name, value }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeybordToggle = (status) => {
    setIsKeyboardShown(status);
  };

  const handleFormSubmit = () => {
    console.log(form);
    Keyboard.dismiss();
    setForm(initFormState);
  };

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../../assets/images/PhotoBG2x.jpg')}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.form}>
          <AddAvatar form={form} setForm={setForm} />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Registration</Text>
          </View>
          <Input
            name={'login'}
            value={form.login}
            placeholder="Login"
            onInputChange={handleInputChange}
            onKeybordToggle={handleKeybordToggle}
          />
          <Input
            name={'email'}
            value={form.email}
            placeholder="E-mail address"
            onInputChange={handleInputChange}
            onKeybordToggle={handleKeybordToggle}
          />
          <Password
            name={'password'}
            value={form.password}
            placeholder="Password"
            onInputChange={handleInputChange}
            onKeybordToggle={handleKeybordToggle}
          />
          {!isKeyboardShown && (
            <Btn title="Sign up" onFormSubmit={handleFormSubmit} form={form} />
          )}
          {!isKeyboardShown && (
            <View style={styles.navWrapper}>
              <Text style={styles.navLink}>
                {'Already have an account? Log in'}
              </Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    height: deviceHeight,
    width: deviceWidth,
    justifyContent: 'flex-end',
  },
  form: {
    paddingHorizontal: 16,
    backgroundColor: colors.primaryBg,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: deviceHeight > smallDevice ? 78 : 32,
  },
  title: {
    color: colors.primaryText,
    fontSize: 30,
    lineHeight: 35,
    fontWeight: 500,
  },
  titleWrapper: {
    alignItems: 'center',
    marginBottom: 16,
    marginTop: deviceHeight > smallDevice ? 92 : 72,
  },
  navWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  navLink: {
    color: colors.navigation,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 400,
  },
});
