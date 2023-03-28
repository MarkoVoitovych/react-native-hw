import { useState } from 'react';
import { StyleSheet, TextInput, View, Pressable, Text } from 'react-native';
import colors from '../../assets/colors';

export const Password = (props) => {
  const { placeholder, onInputChange, onKeybordToggle, name, value } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [isOnFocus, setIsOnFocus] = useState(false);

  return (
    <View style={styles.passwordWrapper}>
      {showPassword && (
        <Pressable
          style={styles.showWrapper}
          onPress={() => setShowPassword(false)}
        >
          <Text style={styles.showMsg}>Show</Text>
        </Pressable>
      )}
      {!showPassword && (
        <Pressable
          style={styles.showWrapper}
          onPress={() => setShowPassword(true)}
        >
          <Text style={styles.showMsg}>Hide</Text>
        </Pressable>
      )}
      <TextInput
        style={{
          ...styles.input,
          borderColor: isOnFocus ? colors.accent : colors.border,
        }}
        placeholder={placeholder}
        placeholderTextColor={colors.secondaryText}
        secureTextEntry={showPassword}
        onFocus={() => {
          onKeybordToggle(true);
          setIsOnFocus(true);
        }}
        onBlur={() => {
          onKeybordToggle(false);
          setIsOnFocus(false);
        }}
        onChangeText={(text) => onInputChange({ name, value: text })}
        value={value}
        autoComplete={'off'}
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  passwordWrapper: { marginTop: 16, height: 50, position: 'relative' },
  showWrapper: {
    position: 'absolute',
    zIndex: 2,
    right: 16,
    top: 16,
  },
  showMsg: {
    color: colors.navigation,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 400,
  },
  input: {
    backgroundColor: colors.secondaryBg,
    height: 50,
    padding: 16,

    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 18,
    color: colors.primaryText,
    borderColor: colors.border,
  },
});
