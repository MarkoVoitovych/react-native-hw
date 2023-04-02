import { StyleSheet } from 'react-native';
import common from '../../components/common';

const { MainContainer, TextRobotoRegular } = common;

export default CreatePostsScreen = (props) => {
  return (
    <MainContainer style={styles.container}>
      <TextRobotoRegular>CreatePostsScreen</TextRobotoRegular>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
