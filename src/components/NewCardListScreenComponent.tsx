//Card Component

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import PersonIcon from '../assets/images/jobTitle.svg';
import PhoneIcon from '../assets/images/phone.svg';
import MailIcon from '../assets/images/mail.svg';
import CompanyIcon from '../assets/images/organisation.svg';
import ArrowIcon from '../assets/images/Arrow.svg';
import colors from '../utils/colorPallete';

const screenWidth = Dimensions.get('window').width;
const contentWidth = screenWidth - 180;

const styles = StyleSheet.create({
  card_container: {
    height: 300,
    paddingRight: 20,
    backgroundColor: colors['secondary-light'],
    borderRadius: 10,
    paddingTop: 10,
    shadowColor: colors['primary-text'],
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  first_row: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 10,
    paddingLeft: 20,
  },
  second_row: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    marginBottom: 5,
  },
  card_name: {
    fontFamily: 'Roboto',
    fontSize: 22,
    color: colors['primary-text'],
  },
  job_position: {
    fontFamily: 'Roboto',
    fontSize: 18,
    marginRight: 40,
    marginLeft: 10,
    width: contentWidth,
  },
  tr1: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: colors['secondary-light'],
    height: 33,
    alignItems: 'center',
    paddingLeft: 20,
    marginLeft: 22,
    marginBottom: 15,
  },
  detailStyle: {
    flexDirection: 'column',
    marginBottom: 20,
    gap: 1,
    width: '100%',
  },
  phone_number: {
    fontFamily: 'Roboto',
    fontSize: 18,
    marginLeft: 10,
    width: contentWidth,
  },
  mail_text: {
    fontSize: 18,
    fontFamily: 'Roboto',
    marginRight: 40,
    marginLeft: 10,
    width: contentWidth,
  },
  company_name: {
    fontSize: 18,
    fontFamily: 'Roboto',
    marginLeft: 10,
    width: contentWidth,
  },
  card_button: {
    backgroundColor: colors['primary-accent'],
    borderRadius: 8,
    height: 25,
    width: 81,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  button_text: {
    fontFamily: 'Roboto',
    fontSize: 10,
    color: colors['primary-text'],
    fontWeight: '500',
    marginRight: 0,
  },
});

interface Prop {
  name: string;
  job_position: string;
  email: string;
  phone_number: string;
  company_name: string;
  alignToSides?: boolean;
  clickFunc?: () => void;
}

const truncateContactName = (name: string) => {
  if (name.length > 22) {
    return name.substring(0, 22) + '..'; // Add '..' if name exceeds 14 characters
  }
  return name;
};
// type Card = {card_name:string,job_role:string,email:string,company_name:string}
const NewCardComponent: React.FC<Prop> = ({
  alignToSides,
  name,
  job_position,
  email,
  phone_number,
  company_name,
  clickFunc,
}): JSX.Element => {
  return (
    <TouchableOpacity style={styles.card_container} onPress={clickFunc}>
      <View
        style={[
          styles.first_row,
          alignToSides
            ? { justifyContent: 'space-between' }
            : { justifyContent: 'center' },
        ]}
      >
        <Text style={styles.card_name}>{truncateContactName(name)}</Text>
        {alignToSides && (
          <TouchableOpacity style={styles.card_button} onPress={clickFunc}>
            <Text style={styles.button_text}>View Card</Text>
            <ArrowIcon width={10} height={10} fill={'black'}></ArrowIcon>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.detailStyle}>
        <View style={styles.tr1}>
          <PersonIcon width={18} height={18} fill={'black'} />
          <Text style={styles.job_position}>{truncateContactName(job_position)}</Text>
        </View>

        <View style={styles.tr1}>
          <PhoneIcon width={18} height={18} fill={'white'}></PhoneIcon>
          <Text style={styles.phone_number}>{phone_number}</Text>
        </View>

        <View style={styles.tr1}>
          <MailIcon width={18} height={18} fill={'white'}></MailIcon>
          <Text style={styles.mail_text}>  {truncateContactName(email)}</Text>
        </View>

        <View style={styles.tr1}>
          <CompanyIcon width={18} height={18} fill={'white'}></CompanyIcon>
          <Text style={styles.company_name}>  {truncateContactName(company_name)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewCardComponent;
