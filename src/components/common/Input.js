import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import colors from '../../assets/colors';

export const Input = (props) => {
  const { placeholder, onInputChange, onKeybordToggle, name, value } = props;
  const [isOnFocus, setIsOnFocus] = useState(false);
  return (
    <TextInput
      style={{
        ...styles.input,
        borderColor: isOnFocus ? colors.accent : colors.border,
      }}
      placeholder={placeholder}
      placeholderTextColor={colors.secondaryText}
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
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.secondaryBg,
    height: 50,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 18,
    color: colors.primaryText,
    borderColor: colors.border,
  },
});
