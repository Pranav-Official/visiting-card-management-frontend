import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const ContactInfoShimmer = () => {
  return (
    <View style={styles.container}>
      <ShimmerPlaceholder
        style={styles.shimmer}
        LinearGradient={LinearGradient}
      />
      <ShimmerPlaceholder
        style={styles.shimmer}
        LinearGradient={LinearGradient}
      />
      <ShimmerPlaceholder
        style={styles.shimmer}
        LinearGradient={LinearGradient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 20,
  },
  shimmer: {
    marginBottom: 10,
    width: '80%',
    height: 20,
    borderRadius: 5,
  },
});

export default ContactInfoShimmer;
