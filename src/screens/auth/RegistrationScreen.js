import { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
} from 'react-native';

import colors from '../../assets/colors';
import smallDevice from '../../utils/smallDeviceDimens';
import { AddAvatar } from '../../components/AddAvatar';
import common from '../../components/common';

const {
  TextRobotoMedium,
  TextRobotoRegular,
  Btn,
  Input,
  Password,
  MainContainer,
} = common;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const initFormState = {
  avatarUrl: '',
  login: '',
  email: '',
  password: '',
};

export const RegistrationScreen = ({ navigation }) => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [form, setForm] = useState(initFormState);

  const handleInputChange = ({ name, value }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleKeybordToggle = (status) => {
    setIsKeyboardShown(status);
  };
  const handleFormSubmit = () => {
    navigation.navigate('Home');
    Keyboard.dismiss();
    setForm(initFormState);
  };

  return (
    <MainContainer>
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
              <TextRobotoMedium style={styles.title}>
                Registration
              </TextRobotoMedium>
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
              <Btn
                title="Sign up"
                onFormSubmit={handleFormSubmit}
                form={form}
              />
            )}
            {!isKeyboardShown && (
              <Pressable
                style={styles.navWrapper}
                onPress={() => navigation.navigate('Login')}
              >
                <TextRobotoRegular style={styles.navLink}>
                  {'Already have an account? Log in'}
                </TextRobotoRegular>
              </Pressable>
            )}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </MainContainer>
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
    backgroundColor: colors.PRIMARY_BG,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: deviceHeight > smallDevice.height ? 78 : 32,
  },
  title: {
    color: colors.PRIMARY_TEXT_COLOR,
    fontSize: 30,
    lineHeight: 35,
  },
  titleWrapper: {
    alignItems: 'center',
    marginBottom: 16,
    marginTop: deviceHeight > smallDevice.height ? 92 : 72,
  },
  navWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  navLink: {
    color: colors.NAV_TEXT_COLOR,
    fontSize: 16,
    lineHeight: 19,
  },
});
