import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../utils/colorPallete';
import ImageView from 'react-native-image-viewing';

type ImgContainer = {
  Image: string;
  onPress: () => void;
  indexSetter: () => void;
};

const CommonImage = (props: ImgContainer) => {
  return (
    <View style={styles.CommonImagecontainer}>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => {
          props.onPress();
          props.indexSetter();
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: props.Image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

type imageURI = {
  frontImageUri?: string;
  backImageUri?: string;
};

const CommonImageComponent = ({ frontImageUri, backImageUri }: imageURI) => {
  const imageData = [];

  if (frontImageUri) {
    imageData.push({ uri: frontImageUri });
  }
  if (backImageUri) {
    imageData.push({ uri: backImageUri });
  }

  const [isImageVisible, setIsImageVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const itemSeparator = () => <View style={styles.separator} />;
  if (!frontImageUri && !backImageUri) {
    return (
      <TouchableOpacity>
        <View style={styles.mainStyle}>
          <Image
            source={require('../assets/images/DefaultCard.png')}
            style={styles.singleImage}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={styles.mainStyle}>
        <FlatList
          data={imageData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <CommonImage
              Image={item.uri}
              indexSetter={() => setImageIndex(index)}
              onPress={() => setIsImageVisible(true)}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={itemSeparator}
          contentContainerStyle={
            imageData.length === 1 ? styles.CommonImagecontainer2 : null
          }
        />
        <ImageView
          images={imageData}
          imageIndex={imageIndex}
          keyExtractor={(_, index) => index.toString()}
          visible={isImageVisible}
          onRequestClose={() => setIsImageVisible(false)}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  CommonImagecontainer: {
    paddingLeft: 20,
  },
  mainStyle: {
    backgroundColor: colors['secondary-light'],
    // paddingLeft: 20,
    paddingTop: 20,
    flex: 1,
    gap: 10,
  },
  CommonImagecontainer2: {
    paddingLeft: 25,
    width: '100%',
  },
  separator: {
    width: 0,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors['accent-white'],
    borderRadius: 20,
    height: 200,
    width: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.38,
    shadowRadius: 4.84,
    elevation: 5,
  },
  gap: {
    height: 20,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  },
  singleImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors['accent-white'],
    marginLeft: 45,
    borderRadius: 20,
    height: 200,
    width: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.38,
    shadowRadius: 4.84,
    elevation: 5,
  },
});

export default CommonImageComponent;
