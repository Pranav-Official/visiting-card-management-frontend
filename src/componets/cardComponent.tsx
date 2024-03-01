import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PersonIcon from '../assets/images/person.svg'
import PhoneIcon from '../assets/images/phone.svg'
import MailIcon from '../assets/images/mail.svg'
import CompanyIcon from'../assets/images/organisation.svg'



const styles = StyleSheet.create({
    card_container:{
        height:154,
        paddingHorizontal:30,
        backgroundColor: '#ddd',
        borderRadius:10,
        paddingTop:10,        
    },
    first_row:{
        flexDirection:'row',
        flex:1,
        paddingBottom:20,
    },
    second_row:{
        flexDirection:'row',
        flex:2,
        justifyContent:'center',
        paddingLeft:20
    
    },
    third_row:{
        flexDirection:'row',
        flex:2,
        justifyContent:'center',
        paddingLeft:20,
    },
    card_name:{
        fontFamily:'Roboto',
        fontSize: 20, 
        color: 'black',       
    },
    sr1:{
        flexDirection:'row',
        flex:1
    },
    job_position:{
        fontFamily:'Roboto',
        fontSize:12,
        marginRight: 40,
        color:'102D4A',
        marginLeft:10,
    },
    sr2:{
        flexDirection:'row',
        flex:1
    },
    tr1:{
        flexDirection:'row',
        flex:1
    },
    tr2:{
        flexDirection:'row',
        flex:1,
    },
    phone_number:{
        fontFamily:'Roboto',
        fontSize:12,
        marginLeft:10,
    },
    mail_text:{
        fontSize: 12,
        fontFamily:"Roboto",
        marginRight:40,
        marginLeft:10,
    },
    company_name:{
        fontSize:12,
        fontFamily:'Roboto',
        marginLeft:10,
    }
})



// type Card = {card_name:string,job_role:string,email:string,company_name:string}
const CardComponent: React.FC<Props> = ({ alignToSides }): JSX.Element =>{
    return(
        <View style={styles.card_container}>
            <View style = {[styles.first_row,alignToSides?{justifyContent:'space-between'}:{justifyContent:'center'}]}>
                <Text style ={styles.card_name}>Makoto Shinkai</Text>
                {alignToSides && (
                    <TouchableOpacity>
                        <Text>Button</Text>
                    </TouchableOpacity>
                )}
            </View>
            
            <View style = {styles.second_row}>
                <View style = {styles.sr1}>
                    <PersonIcon width = {14} height={14} fill={'black'}/>       
                    <Text style = {styles.job_position}>System Architect</Text>
                </View>
                <View style = {styles.sr2}>
                    <PhoneIcon width={14} height={14} fill={'white'}></PhoneIcon>
                    <Text style = {styles.phone_number}>+81 36574 48273</Text>
                </View>
            </View>
            <View style = {styles.third_row}>
            <View style = {styles.tr1}>
                    <MailIcon width={14} height={14} fill={'white'}></MailIcon>
                    <Text style = {styles.mail_text}>makoto@gmail...</Text>
            </View>
            <View style = {styles.tr2}>
                    <CompanyIcon width={14} height={14} fill={'white'}></CompanyIcon>
                    <Text style ={ styles.company_name}>Mitsubishi Motors</Text>

            </View>

            </View>
            

        </View>

    )
}

export default CardComponent;