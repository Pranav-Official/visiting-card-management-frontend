import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../utils/colorPallete';
import Phone from '../../assets/images/phone.svg';
import Company from '../../assets/images/company.svg';
import Person from '../../assets/images/person.svg';
import MainButtonComponent from '../../components/MainButtoncomponent';
import ProfileButtonComponent from '../../components/ProfileButtonComponent';
import { getProfile } from '../../hooks/getProfileDetailsHook';
import { getLocalItem, setLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
import { userLogin } from '../../context/userSlice';
import { useDispatch } from 'react-redux';

type UserData = {
  email: string;
  fullName: string;
  totalAcceptedCards: number;
  totalContacts: number;
  totalPendingCards: number;
};

type ResponseType = {
  userData: UserData;
  status: boolean;
};

const ProfileScreen = () => {
  const [profileResponse, setProfileResponse] = useState<ResponseType | null>(
    null,
  );
  const splittedName = profileResponse?.userData.fullName.split(' ');
  const firstName = splittedName ? splittedName[0] : '';
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const user_id = (await getLocalItem(Constants.USER_ID)) ?? '';
        const jwtToken = (await getLocalItem(Constants.USER_JWT)) ?? '';
        console.log('\n\nReached PROFILE SCREEN USE EFFECT');

        const response = await getProfile(user_id, jwtToken);

        setProfileResponse(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileData();
  }, []);

  const dispatch = useDispatch();
  const Logout = () => {
    setLocalItem(Constants.IS_LOGGED_IN, 'false');
    setLocalItem(Constants.USER_JWT, '');
    setLocalItem(Constants.USER_ID, '');
    dispatch(userLogin(false));
  };
  return (
    <ScrollView style={styles.profileMainContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.profileDetailsContainer}>
          <View style={styles.profileImageContainer}>
            <Text style={styles.profileText}>
              {profileResponse?.userData.fullName[0]}
            </Text>
          </View>

          <View style={styles.details}>
            <Text style={styles.userName}>Hi {firstName}!</Text>
            <Text style={styles.userEmail}>
              {profileResponse?.userData.email}
            </Text>

            <View style={styles.contactInfoContainer}>
              <TouchableOpacity style={styles.contactInfo}>
                <Person color={'primary-text'} style={styles.icons} />
                <Text style={styles.phoneText}>Add Job Title</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactInfo}>
                <Phone color={'primary-text'} style={styles.icons} />
                <Text style={styles.phoneText}>Add Phone Number</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactInfo}>
                <Company color={'primary-text'} style={styles.icons} />
                <Text style={styles.phoneText}>Add Company Name</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.middleContainer}>
          <Text style={styles.number}>
            {profileResponse?.userData.totalContacts}
          </Text>
          <Text style={styles.numberText}>Total Contacts</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <ProfileButtonComponent title={'View Shared Contacts'} />
          <ProfileButtonComponent title={'Change Password'} danger={true} />
          <MainButtonComponent title={'Logout'} onPressing={Logout} />
        </View>
      </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  profileMainContainer: {
    backgroundColor: colors['secondary-light'],
    height: '100%',
  },
  profileContainer: {
    marginTop: 110,
    marginHorizontal: 20,
    flexDirection: 'column',
    gap: 45,
  },
  profileImageContainer: {
    marginTop: -80,
    alignItems: 'center',
    justifyContent: 'center',

    height: 110,
    width: 110,
    backgroundColor: '#C21045',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',

    shadowColor: colors['primary-text'],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  profileText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors['secondary-light'],
  },
  profileDetailsContainer: {
    alignItems: 'center',
    backgroundColor: colors['secondary-light'],
    borderRadius: 15,

    shadowColor: colors['primary-text'],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  details: {
    marginTop: 10,
    alignItems: 'center',
  },
  userName: {
    fontSize: 38,
    fontWeight: 'bold',
    color: colors['primary-text'],
  },
  userEmail: {
    fontSize: 20,
    color: colors['accent-grey'],
  },
  contactInfoContainer: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 20,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icons: {
    marginRight: 15,
  },
  phoneText: {
    fontSize: 18,
    color: colors['primary-text'],
    textDecorationLine: 'underline',
  },
  middleContainer: {
    alignItems: 'center',
  },
  number: {
    fontSize: 52,
    fontWeight: 'bold',
    color: colors['primary-text'],
  },
  numberText: {
    fontSize: 20,
    color: colors['primary-text'],
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 20,
    height: 200,
  },
});

export default ProfileScreen;
