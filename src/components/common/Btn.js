import { Pressable, StyleSheet, Text } from 'react-native';
import colors from '../../assets/colors';

export const Btn = (props) => {
  const { title, onFormSubmit, form } = props;

  const isDisable = Object.keys({ ...form, avatarUrl: 'default' }).every(
    (item) => item == true
  );
  return (
    <Pressable
      disabled={isDisable}
      style={styles.button}
      onPress={onFormSubmit}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.accent,
    color: colors.primaryBg,
    height: 51,
    borderRadius: 100,
    marginTop: 43,
  },
  title: {
    fontSize: 16,
    color: colors.primaryBg,
    fontWeight: 400,
    lineHeight: 19,
  },
});
