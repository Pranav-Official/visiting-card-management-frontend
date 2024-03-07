import { FlatList, View } from 'react-native';
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
      style={{ marginTop: 5 }}
      data={cardDetails}
      renderItem={({ item }) => (
        <View
          style={{
            flexDirection: 'column',
          }}
        >
          <ShimmerPlaceholder
            style={{ width: 250, height: 30 ,justifyContent: 'center',
              gap:6}}
            LinearGradient={LinearGradient}
          ></ShimmerPlaceholder>
        </View>
      )}
      keyExtractor={(item) => item.detail_id}
    />
  );
};

export default CardDetailsShimmer;
