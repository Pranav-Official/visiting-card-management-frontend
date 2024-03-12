import React, { useState, useEffect } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CompanyIcon from '../../assets/images/company.svg';
import PhoneIcon from '../../assets/images/phone.svg';
import MailIcon from '../../assets/images/mail.svg';
import WebsiteIcon from '../../assets/images/website.svg';
import DesignationIcon from '../../assets/images/jobTitle.svg';
import colors from '../../utils/colorPallete';
import MainButtonComponent from '../../components/MainButtoncomponent';
import CommonImageComponent from '../../components/CommonImageComponent';
import EditInputComponent from '../../components/InputComponent';
import EditCardNameComponent from '../../components/EditCardNameComponent';
import BackButtonIcon from '../../assets/images/Arrow.svg';
import { editCardDetails } from '../../hooks/editCardHook';
import Constants from '../../utils/Constants';
import { getLocalItem } from '../../utils/Utils';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import BottomSheetComponent from '../../components/BottomSheetComponent';
import CardComponent from '../../components/CardComponent';
import { getSimilarCards } from '../../hooks/getSimilarCardsHook';
import { isValidPhoneNumber, validateEmail } from '../../utils/regexCheck';

type Card = {
  card_id: string;
  card_name: string;
  email: string;
  phone: string;
  job_title: string;
  company_name: string;
  company_website: string;
};
type ContactCards = {
  contact_name: string;
  cards: Card[];
};
//To set border color for  mandatory fields
type BorderTypes = 'Danger' | 'Auth' | 'Normal';
type ColorTypes = 'red' | '#8080';

//Edit Card Details Screen
const EditCardDetails = ({ route }: any) => {
  const [cardDetails, setCardDetails] = useState(route.params.cardDetails);
  const navigation = useNavigation<NavigationProp<any>>();

  const [emailBorder, setEmailBorder] = useState<BorderTypes>('Normal');
  const [phoneBorder, setPhoneBorder] = useState<BorderTypes>('Normal');
  const [cardNameColor, setCardNameColor] = useState<ColorTypes>('#8080');
  const [mandatoryFieldsEmpty, setMandatoryFieldsEmpty] = useState(false);

  const [similarCardList, setSimilarCardList] = React.useState<ContactCards>({
    contact_name: '',
    cards: [],
  });
  //To set similar card modal visibility state
  const [modalVisibility, setModalVisibility] = React.useState(false);

  useEffect(() => {
    if (route.params.cardDetail) {
      setCardDetails(route.params.cardDetails);
    }
  }, [route.params.cardDetails]);
  //If create flag is false, function to save the edits(Function for edit card page)
  const saveEditChanges = async () => {
    try {
      const user_id = (await getLocalItem(Constants.USER_ID)) ?? '{}';
      const token = (await getLocalItem(Constants.USER_JWT)) ?? '{}';

      // Filtering out the edited fields
      const editedData = Object.keys(cardDetails)
        .filter((key) => cardDetails[key] !== route.params.cardDetails[key])
        .reduce((obj: any, key) => {
          obj[key] = cardDetails[key];
          return obj;
        }, {});
      //calling editCardDetails Hook
      const response = await editCardDetails({
        user_id,
        token,
        card_id: route.params.card_id,
        updatedData: editedData,
      });

      const isSaved = response.statusCode;

      //if save successful,navigating to cardDetails screen
      if (isSaved === '200') {
        navigation.navigate('CardStack', {
          screen: 'CardDetailsScreen',
          params: { card_id: route.params.card_id },
        });
      }
    } catch (error) {
      console.error('Error editing card:', error);
    }
  };
  // function called when a newly created card or edited card is saved
  const handleSavePress = async () => {
    if (!cardDetails.email.trim()) {
      setEmailBorder('Danger');
    } else {
      if (!validateEmail(cardDetails.email)) {
        setEmailBorder('Danger');
        setMandatoryFieldsEmpty(true);
        return;
      } else {
        setEmailBorder('Normal');
      }
    }

    if (!cardDetails.phone.trim()) {
      setPhoneBorder('Danger');
    } else {
      if (!isValidPhoneNumber(cardDetails.phone)) {
        setPhoneBorder('Danger');
        setMandatoryFieldsEmpty(true);
        return;
      } else {
        setPhoneBorder('Normal');
      }
    }

    if (!cardDetails.email.trim() || !cardDetails.phone.trim()) {
      setMandatoryFieldsEmpty(true);
      return;
    }
    // checking whether edits are for creating a card
    if (route.params.create) {
      //Card name editable only on create a new card page
      setCardNameColor('red');
      if (!cardDetails.card_name.trim()) {
        setMandatoryFieldsEmpty(true);
        return;
      } else {
        setCardNameColor('#8080');
      }
      if (!mandatoryFieldsEmpty) {
        //calls the fetchSimilarCards api hook
        const SimilarCardsCheck = await fetchSimilarCards();

        //if similar cards exist, show the modal, else go to add contact screen
        if (SimilarCardsCheck) {
          setModalVisibility(true);
        } else {
          navigation.navigate('SetContactNameScreen', {
            cardDetails: cardDetails,
          });
        }
      } else {
        // If create flag is false, call saveChanges function
        await saveEditChanges();
      }
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setCardDetails({ ...cardDetails, [key]: value });
    //setting non empty states for mandatory fields for entries
    if (key === 'card_name') {
      setMandatoryFieldsEmpty(false);
      setCardNameColor('#000');
    }
    if (key === 'email') {
      setMandatoryFieldsEmpty(false);
      setEmailBorder('Normal');
    }
    if (key === 'phone') {
      setMandatoryFieldsEmpty(false);
      setPhoneBorder('Normal');
    }
  };

  //Rendering similar cards
  const renderItem = ({ item }: any) => (
    <View style={[styles.similarCardsContainer]}>
      <Text style={styles.contactNameInModal}>{item.contact_name}</Text>

      {item.cards.map((card: any) => (
        <View style={styles.singleCard}>
          <CardComponent
            key={card.card_id}
            alignToSides={false}
            job_position={card.job_title}
            name={card.card_name}
            email={card.email}
            phone_number={card.phone}
            company_name={card.company_name}
          />
        </View>
      ))}
    </View>
  );

  //function to fetch similar cards from user's contacts
  const fetchSimilarCards = async () => {
    try {
      const user_id = (await getLocalItem(Constants.USER_ID)) ?? '';
      const jwtToken = (await getLocalItem(Constants.USER_JWT)) ?? '';
      const result = await getSimilarCards({
        user_id,
        card_name: cardDetails.card_name,
        phone: cardDetails.phone,
        email: cardDetails.email,
        jwtToken,
      });

      setSimilarCardList(result.similarCardList);

      if (result.statusCode === '200') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('\n\nCatch Error\n\n', error);
    }
  };
  //Setting navgation from similarCards to cardDetails page
  const navigateToPage = async (pageToNavigate: string) => {
    navigation.navigate(pageToNavigate, { similarCardList, cardDetails });
  };

  return (
    <ScrollView style={styles.editContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <BackButtonIcon width={30} height={30} rotation={180} />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <CommonImageComponent />
      </View>
      <View style={styles.cardNameHead}>
        <EditCardNameComponent
          placeholder={'Enter Card Name'}
          value={cardDetails.card_name}
          setter={(value: string) => handleInputChange('card_name', value)}
          readonly={!route.params.create}
          textColor={cardNameColor}
        />
      </View>
      <View style={styles.inputFieldsContainer}>
        <View style={styles.iconField}>
          <View style={styles.icon}>
            <DesignationIcon width={30} height={20} />
          </View>
          <View style={styles.input}>
            <EditInputComponent
              placeholder="Job title"
              header="Job Title"
              hidden={false}
              value={cardDetails.job_title}
              setter={(value: string) => handleInputChange('job_title', value)}
            />
          </View>
        </View>
        <View style={styles.iconField}>
          <View style={styles.icon}>
            <CompanyIcon width={30} height={20} />
          </View>
          <View style={styles.input}>
            <EditInputComponent
              placeholder="Company Name"
              header="Company Name"
              hidden={false}
              value={cardDetails.company_name}
              setter={(value: string) =>
                handleInputChange('company_name', value)
              }
            />
          </View>
        </View>
        <View style={styles.iconField}>
          <View style={styles.icon}>
            <PhoneIcon width={30} height={20} />
          </View>
          <View style={styles.input}>
            <EditInputComponent
              placeholder="Phone Number"
              header="Phone Number"
              hidden={false}
              value={cardDetails.phone}
              setter={(value: string) => handleInputChange('phone', value)}
              borderType={phoneBorder}
            />
          </View>
        </View>
        <View style={styles.iconField}>
          <View style={styles.icon}>
            <MailIcon width={30} height={20} />
          </View>
          <View style={styles.input}>
            <EditInputComponent
              placeholder="E-mail"
              header="E-mail"
              hidden={false}
              value={cardDetails.email}
              setter={(value: string) => handleInputChange('email', value)}
              borderType={emailBorder}
            />
          </View>
        </View>
        <View style={styles.iconField}>
          <View style={styles.icon}>
            <WebsiteIcon width={30} height={20} />
          </View>
          <View style={styles.input}>
            <EditInputComponent
              placeholder="Website"
              header="Website"
              hidden={false}
              value={cardDetails.company_website}
              setter={(value: string) =>
                handleInputChange('company_website', value)
              }
            />
          </View>
        </View>
      </View>
      <View style={styles.save}>
        <View>
          {/* toggle indicating mandatory fields are empty or invalid data in fields*/}
          {mandatoryFieldsEmpty && (
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleMessage}>
                Please fill the above fields with valid data.
              </Text>
            </View>
          )}
        </View>
        <MainButtonComponent
          children={undefined}
          title={'Save'}
          onPressing={handleSavePress}
        />
      </View>
      {/* Similar Cards displaying modal */}
      <BottomSheetComponent
        visibility={modalVisibility}
        visibilitySetter={setModalVisibility}
      >
        <View style={styles.modalView}>
          <Text style={styles.similarCardsText}>
            Similar Cards Already Exists!
          </Text>

          <FlatList
            data={similarCardList}
            renderItem={renderItem}
            keyExtractor={(item) => item.cards}
          />
          <View style={styles.buttonContainer}>
            <Text style={styles.similarCardsText}>Choose an Option</Text>
            <MainButtonComponent
              title="Overwrite Existing Card"
              onPressing={() => navigateToPage('CardOverwriteScreen')}
            ></MainButtonComponent>
            <MainButtonComponent
              title="Add to Existing Contacts"
              onPressing={() => navigateToPage('AddToContactScreen')}
            ></MainButtonComponent>
            <MainButtonComponent
              title="Add as a New Contact"
              onPressing={() => navigateToPage('SetContactNameScreen')}
            ></MainButtonComponent>
          </View>
        </View>
      </BottomSheetComponent>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  editContainer: {
    backgroundColor: colors['secondary-light'],
  },
  contactName: {
    paddingStart: 10,
    fontSize: 24,
    color: colors['primary-text'],
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: colors['secondary-light'],
    marginTop: 20,
  },
  cardName: {
    fontSize: 35,
    fontWeight: '700',
    color: colors['primary-text'],
  },
  iconField: {
    flexDirection: 'row',
    width: '100%',
  },
  icon: {
    flex: 1,
    alignSelf: 'center',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: colors['secondary-grey'],
  },
  input: {
    flex: 10,
    paddingRight: 10,
  },
  save: {
    height: 170,
    padding: 30,
  },
  cardNameHead: {
    marginTop: 5,
    marginBottom: 5,
  },
  inputFieldsContainer: {
    marginRight: 25,
    marginLeft: 25,
  },
  backButton: {
    width: '100%',
    marginTop: 20,
    marginLeft: 20,
  },

  //Modal Stylings
  modalView: {
    marginHorizontal: 25,
    height: '100%',
  },
  similarCardsText: {
    textAlign: 'center',
    color: colors['primary-text'],
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  similarCardsContainer: {
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginBottom: 20,
  },
  contactNameInModal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors['primary-text'],
    paddingVertical: 10,
    marginLeft: 10,
  },
  singleCard: {
    paddingBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
    height: 250,
    marginBottom: 25,
  },
  //mandatory fields -toggle styling
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    marginBottom: 10,
    backgroundColor: colors['secondary-grey'],
  },
  toggleMessage: {
    color: colors['primary-danger'],
    fontSize: 15,
    marginTop: 10,
  },
});

export default EditCardDetails;
