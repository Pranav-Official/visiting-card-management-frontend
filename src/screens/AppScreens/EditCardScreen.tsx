import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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

const EditCardDetails = () => {
  return (
    <View style={styles.editContainer}>
      <View style={styles.imageContainer}>
        <CommonImageComponent />
      </View>
      <View style={styles.cardNameHead}>
        <EditCardNameComponent
          placeholder={'Card Name'}
          value={'Card Name'}
          setter={() => console.log('card_name')}
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
              value={'Software Engineer'}
              setter={() => console.log('job_title')}
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
              value={'Company Name'}
              setter={() => console.log('company_name')}
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
              value={'Phone Number'}
              setter={() => console.log('phone')}
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
              value={'E-mail'}
              setter={() => console.log('email')}
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
              value={'website.com'}
              setter={() => console.log('company_website')}
            />
          </View>
        </View>
      </View>
      <View style={styles.save}>
        <MainButtonComponent
          children={undefined}
          title={'Save'}
          onPressing={() => {
            console.log('save');
          }}
        />
      </View>
    </View>
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
    width: 400,
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
    height: 120,
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
});

export default EditCardDetails;
