//Card Component
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import JobTitleIcon from '../assets/images/jobTitle.svg';
import PhoneIcon from '../assets/images/phone.svg';
import MailIcon from '../assets/images/mail.svg';
import CompanyIcon from '../assets/images/organisation.svg';
import ArrowIcon from '../assets/images/Arrow.svg';
import colors from '../utils/colorPallete';

const styles = StyleSheet.create({
  card_container: {
    height: 170,
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
    flex: 2,
    paddingTop: 10,
    paddingLeft: 20,
  },
  second_row: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'center',
    paddingLeft: 20,
    marginBottom: 10,
    gap: 10,
  },
  third_row: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'center',
    paddingLeft: 20,
    gap: 10,
    marginBottom: 10,
  },
  card_name: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: 'black',
  },
  sr1: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: colors['accent-white'],
    height: 33,
    alignItems: 'center',
    paddingLeft: 10,
  },
  job_position: {
    fontFamily: 'Roboto',
    fontSize: 12,
    marginRight: 40,
    color: '#102D4A',
    marginLeft: 10,
    width: 110,
  },
  sr2: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: colors['accent-white'],
    height: 33,
    alignItems: 'center',
    paddingLeft: 10,
  },
  tr1: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: colors['accent-white'],
    height: 33,
    alignItems: 'center',
    paddingLeft: 10,
  },
  tr2: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: colors['accent-white'],
    height: 33,
    alignItems: 'center',
    paddingLeft: 10,
  },
  phone_number: {
    fontFamily: 'Roboto',
    fontSize: 12,
    marginLeft: 10,
    width: 110,
  },
  mail_text: {
    fontSize: 12,
    fontFamily: 'Roboto',
    marginRight: 40,
    marginLeft: 10,
    width: 110,
  },
  company_name: {
    fontSize: 12,
    fontFamily: 'Roboto',
    marginLeft: 10,
    width: 110,
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

// type Card = {card_name:string,job_role:string,email:string,company_name:string}
const CardComponent: React.FC<Prop> = ({
  alignToSides,
  name,
  job_position,
  email,
  phone_number,
  company_name,
  clickFunc,
}): JSX.Element => {
  return (
    <TouchableOpacity style={styles.card_container} onPress={clickFunc} testID='card'>
      <View
        style={[
          styles.first_row,
          alignToSides
            ? { justifyContent: 'space-between' }
            : { justifyContent: 'center' },
        ]}
      >
        <Text style={styles.card_name}>{name}</Text>
        {alignToSides && (
          <TouchableOpacity style={styles.card_button} onPress={clickFunc}>
            <Text style={styles.button_text}>View Card</Text>
            <ArrowIcon width={10} height={10} fill={'black'}></ArrowIcon>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.second_row}>
        <View style={styles.sr1}>
          <JobTitleIcon width={14} height={14} fill={'black'} />
          <Text style={styles.job_position}>{job_position}</Text>
        </View>
        <View style={styles.sr2}>
          <PhoneIcon width={14} height={14} fill={'white'}></PhoneIcon>
          <Text style={styles.phone_number}>{phone_number}</Text>
        </View>
      </View>
      <View style={styles.third_row}>
        <View style={styles.tr1}>
          <MailIcon width={14} height={14} fill={'white'}></MailIcon>
          <Text style={styles.mail_text}>{email}</Text>
        </View>
        <View style={styles.tr2}>
          <CompanyIcon width={14} height={14} fill={'white'}></CompanyIcon>
          <Text style={styles.company_name}>{company_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardComponent;
