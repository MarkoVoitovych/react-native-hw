import { StyleSheet } from 'react-native';
import common from '../../components/common';

const { MainContainer, TextRobotoRegular } = common;

export default PostsScreen = (props) => {
  return (
    <MainContainer style={styles.container}>
      <TextRobotoRegular>PostsScreen</TextRobotoRegular>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
