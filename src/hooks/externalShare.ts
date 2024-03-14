
import Share from 'react-native-share';

const shareExternally = (formattedDetails: string) => {
  Share.open({
    message: formattedDetails,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      err && console.log(err);
    });
};

export { shareExternally };