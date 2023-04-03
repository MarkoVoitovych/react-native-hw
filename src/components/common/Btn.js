import { Pressable, StyleSheet } from 'react-native';
import { TextRobotoRegular } from './TextRobotoRegular';
import colors from '../../assets/colors';

export const Btn = (props) => {
  const { title, onFormSubmit, isDisable = false } = props;

  return (
    <Pressable
      disabled={isDisable}
      style={{
        ...styles.button,
        backgroundColor: isDisable ? colors.SECONDARY_BG : colors.ACCENT_COLOR,
      }}
      onPress={onFormSubmit}
    >
      <TextRobotoRegular
        style={{
          ...styles.title,
          color: isDisable ? colors.SECONDARY_TEXT_COLOR : colors.PRIMARY_BG,
        }}
      >
        {title}
      </TextRobotoRegular>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 51,
    borderRadius: 100,
    marginTop: 43,
  },
  title: {
    fontSize: 16,
    lineHeight: 19,
  },
});
