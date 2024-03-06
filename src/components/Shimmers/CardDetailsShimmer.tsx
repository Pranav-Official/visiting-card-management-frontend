import { FlatList, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const cardDetails = [
  {
    detail_id: '1',
    card_detail: '',
  },
];

const CardDetailsShimmer = () => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 10 }}
      data={cardDetails}
      renderItem={({ item }) => (
        <View
          style={{
            flexDirection: 'column',
            // marginTop: '3%',
            marginBottom: '5%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ShimmerPlaceholder
            style={{ width: 200, height: 30 }}
            LinearGradient={LinearGradient}
          ></ShimmerPlaceholder>
        </View>
      )}
      keyExtractor={(item) => item.detail_id}
    />
  );
};

export default CardDetailsShimmer;
