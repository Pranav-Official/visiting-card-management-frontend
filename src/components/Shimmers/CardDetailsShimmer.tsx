import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const CardDetailsShimmer = () => {
  return (
          <ShimmerPlaceholder
            style={{ width: 250, height: 30 ,justifyContent: 'center',}}
            LinearGradient={LinearGradient}
          ></ShimmerPlaceholder>
  );
};

export default CardDetailsShimmer;
