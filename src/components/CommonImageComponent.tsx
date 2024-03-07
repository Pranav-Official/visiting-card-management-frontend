import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../utils/colorPallete';

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
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEXptu3jFyRY50KKSUvX0iKJ7f2zxNPNsMwA&usqp=CAU',
    },
    {
      Image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEXptu3jFyRY50KKSUvX0iKJ7f2zxNPNsMwA&usqp=CAU',
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
    backgroundColor:colors['secondary-light'],
   // paddingLeft: 20,
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
