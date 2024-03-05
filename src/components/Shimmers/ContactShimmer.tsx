import { FlatList, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const contactList = [
  {
    card_id: '1',
    contact_name: '',
  },
  {
    card_id: '2',
    contact_name: '',
  },
  {
    card_id: '3',
    contact_name: '',
  },
  {
    card_id: '4',
    contact_name: '',
  },
  {
    card_id: '5',
    contact_name: '',
  },
  {
    card_id: '6',
    contact_name: '',
  },
];

const ContactShimmer = () => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 20 }}
      data={contactList}
      renderItem={({ item }) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
            marginTop: 7,
            marginBottom: 7,
          }}
        >
          <ShimmerPlaceholder
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
            }}
            LinearGradient={LinearGradient}
          ></ShimmerPlaceholder>
          <ShimmerPlaceholder
            style={{ width: 200, height: 20 }}
            LinearGradient={LinearGradient}
          ></ShimmerPlaceholder>
        </View>
      )}
      keyExtractor={(item) => item.card_id}
    />
  );
};

export default ContactShimmer;
