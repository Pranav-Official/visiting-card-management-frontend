import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

type ImgContainer = {
  Image: string;
  onPress: (text: string) => void;
};

const CommonImage = (props: ImgContainer) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => props.onPress('Tapped Front')}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: props.Image }} style={styles.image} resizeMode="cover" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CommonImageComponent = () => {
  // Sample data for FlatList
  const imageData = [
    {
      Image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg_4qTecYyAS3Le7wSQWgrJoMCHMUVBhSn1B1JxQCBJ7NTeQKMF9IlopklR-24QLFRN00&usqp=CAU',
    },
    {
      Image:
        'https://i.pinimg.com/736x/59/25/a4/5925a4faff25017e546391c8a8527d9b.jpg',
    },
  ];

  const itemSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.mainStyle}>
      <FlatList
        data={imageData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CommonImage
            Image={item.Image}
            onPress={() => {
              console.log('cisin');
            }}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={itemSeparator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainStyle: {
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingTop: 20,
    flex: 1,
    gap: 10,
  },
  separator: {
    width: 20, // Adjust the width based on your desired spacing
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'blue',
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
    height: 20, // Set the desired gap height
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
});

export default CommonImageComponent;
