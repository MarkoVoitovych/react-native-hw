import { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import {
  Feather,
  FontAwesome5,
  Ionicons,
  Entypo,
  MaterialIcons,
} from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';

import common from '../../components/common';
import colors from '../../assets/colors';
import { ImageBackground } from 'react-native';
import { TextRobotoRegular } from '../../components/common/TextRobotoRegular';

const { MainContainer, CameraBtn, Btn } = common;
const initState = {
  imageUrl: '',
  name: '',
  locality: '',
};

export default CreatePostsScreen = ({}) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraStatus, setCameraStatus] = useState(false);
  const [photo, setPhoto] = useState('');
  const [form, setForm] = useState(initState);

  const { width: deviceWidth, height: deviceHeight } = useWindowDimensions();

  const createPhoto = async () => {
    const takenPhoto = await cameraRef.takePictureAsync();
    setPhoto(takenPhoto.uri); // DELETE
    setForm((prev) => ({ ...prev, imageUrl: takenPhoto.uri }));
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  const onFormSubmit = () => {
    setForm(initState);
  };

  return (
    <MainContainer style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        {cameraStatus && photo && (
          <View style={styles.takePhotoContainer}>
            <ImageBackground
              source={{ uri: photo }}
              style={{
                ...styles.takePhotoImg,
                height: deviceHeight - 60,
                width: deviceWidth,
              }}
            >
              <TouchableOpacity
                style={styles.choosePhotoBtn}
                onPress={() => {
                  setCameraStatus(false);
                }}
              >
                <MaterialIcons
                  name="add-photo-alternate"
                  size={32}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.choosePhotoBtn}
                onPress={() => {
                  setPhoto(null);
                }}
              >
                <Entypo name="back" size={32} color="white" />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        )}
        {cameraStatus && !photo && (
          <Camera
            style={{ ...styles.camera, height: deviceHeight - 60 }}
            ref={setCameraRef}
            type={type}
          >
            <View style={{ ...styles.photoView, width: deviceWidth }}>
              <TouchableOpacity
                onPress={() => {
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  );
                }}
              >
                <Ionicons
                  name="camera-reverse-outline"
                  size={34}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  if (cameraRef) {
                    await createPhoto();
                  }
                }}
              >
                <CameraBtn />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPhoto(null);
                  setCameraStatus(false);
                }}
              >
                <Feather name="camera-off" size={28} color="white" />
              </TouchableOpacity>
            </View>
          </Camera>
        )}

        {!cameraStatus && (
          <View style={styles.form}>
            <View
              style={{
                ...styles.photoWrap,
                width: deviceWidth - 32,
                height: (deviceWidth - 32) * 0.7,
              }}
            >
              <ImageBackground
                style={{
                  ...styles.choosenPhoto,
                  width: deviceWidth - 32,
                  height: (deviceWidth - 32) * 0.7,
                }}
                source={{ uri: photo || null }}
              >
                <Pressable
                  style={{
                    ...styles.addPhotoIconWrap,
                    backgroundColor: photo
                      ? 'rgba(255, 255, 255, 0.3)'
                      : colors.PRIMARY_BG,
                  }}
                  accessibilityLabel={'Add picture'}
                  onPress={() => {
                    setPhoto(null);
                    setCameraStatus(true);
                  }}
                >
                  <FontAwesome5
                    name="camera"
                    size={24}
                    color={
                      photo ? colors.PRIMARY_BG : colors.SECONDARY_TEXT_COLOR
                    }
                  />
                </Pressable>
              </ImageBackground>
            </View>
            <View style={styles.addPhotoTextWrap}>
              <TextRobotoRegular style={styles.addPhotoText}>
                {photo ? 'Edit photo' : 'Download photo'}
              </TextRobotoRegular>
            </View>
            <View
              style={{
                ...styles.inputContanier,
                marginBottom: 16,
                marginTop: 32,
              }}
            >
              <TextInput
                style={styles.input}
                value={form.name}
                placeholder="Name..."
                placeholderTextColor={colors.SECONDARY_TEXT_COLOR}
                onChangeText={(value) =>
                  setForm((prev) => ({ ...prev, name: value }))
                }
              />
            </View>
            <View style={styles.inputContanier}>
              <Feather
                name="map-pin"
                size={24}
                color={colors.SECONDARY_TEXT_COLOR}
                style={{ marginRight: 4 }}
              />
              <TextInput
                style={styles.input}
                value={form.locality}
                placeholder="Locality..."
                placeholderTextColor={colors.SECONDARY_TEXT_COLOR}
                onChangeText={(value) =>
                  setForm((prev) => ({ ...prev, locality: value }))
                }
              />
            </View>
            <Btn
              title={'Publish'}
              onFormSubmit={onFormSubmit}
              isDisable={false}
            />
            <Pressable
              style={styles.deleteBtn}
              onPress={() => setForm(initState)}
            >
              <Feather
                name="trash-2"
                size={24}
                color={colors.SECONDARY_TEXT_COLOR}
              />
            </Pressable>
          </View>
        )}
      </KeyboardAvoidingView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  camera: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  takePhotoContainer: {
    // position: 'absolute',
    zIndex: 1,
  },
  takePhotoImg: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  photoView: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: { alignSelf: 'center' },
  takePhotoOut: {
    borderWidth: 2,
    borderColor: 'white',
    height: 50,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  takePhotoInner: {
    borderWidth: 2,
    borderColor: 'white',
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  choosePhotoBtn: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  photoWrap: {
    backgroundColor: colors.SECONDARY_BG,
    borderWidth: 1,
    borderColor: colors.BORDER_COLOR,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContanier: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#E8E8E8',
    height: 50,
    backgroundColor: 'transparent',
    width: '100%',
  },
  input: {
    fontFamily: 'roboto-regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    width: '100%',
  },
  formBtn: {
    padding: 16,
    borderRadius: 100,
    marginTop: 32,
    width: 343,
  },
  deleteBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.SECONDARY_BG,
    borderRadius: 20,
    marginTop: 'auto',
    width: 70,
    height: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  addPhotoIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoTextWrap: {
    marginTop: 8,
  },
  addPhotoText: {
    fontSize: 16,
    lineHeight: 19,
    color: colors.SECONDARY_TEXT_COLOR,
  },
  choosenPhoto: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 8,
  },
});
