import React, { useState } from 'react';
import colors from '../../utils/colorPallete';
import {View,Text} from 'react-native';


interface ShareProp{
    contactName:string,
    card_id:string
}

const ShareCardScreen = ({route}:any) =>{
    const contactName : route.params.ContactName??'';
    const [shareList,setShareList] = useState<ShareProp[]>([]);

    return(
        <View style = {styles.main_container}>
            
        </View>
    )
}