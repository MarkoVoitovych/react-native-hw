import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase.config';

const DEFAULT_AVATAR_IMG =
  'gs://markovoitovych-react-native-hw.appspot.com/avatars/defaultAvatar.jpg';

export const uploadImage = async (uri, filePath) => {
  try {
    if (!uri) {
      const url = await getDownloadURL(DEFAULT_AVATAR_IMG);
      return url;
    }
    const response = await fetch(uri).then((res) => res.blob());
    const imageRef = ref(storage, filePath);
    await uploadBytes(imageRef, response);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    throw error;
  }
};
