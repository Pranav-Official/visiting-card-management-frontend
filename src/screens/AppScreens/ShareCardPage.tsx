import React, { useEffect, useState } from 'react';
import colors from '../../utils/colorPallete';
import {View,FlatList} from 'react-native';
import SearchBarComponent from '../../components/SearchBarComponent';
import ShareCardComponent from '../../components/ShareCardContactComponent';
import { listUsers } from '../../hooks/GetUserHook';

interface ShareProp{
    user_fullname:string,
    user_Id:string
}

const ShareCardScreen = () =>{

    const [shareList,setShareList] = useState<ShareProp[]>([]);

    useEffect(() => {
        const fetchData = async() =>{
            try{
                const user_id = (await getItem(Constants.USER_ID)) ?? '';
                const jwt_token = (await getItem(Constants.TOKEN)) ?? '';

                const result = await listUsers({user_id,jwt_token});
                setShareList(result.userResp);
                //console.log(shareList);

            }
            catch(error)
            {
                console.log(error);
            }
        };
        fetchData();
    });

    return(
        <View style = {styles.main_container}>
            <View style = {styles.search_bar_container}>
                <SearchBarComponent>
                </SearchBarComponent>
            </View>
            <View style = {styles.contact_area}>
                <FlatList
                contentContainerStyle = {styles.flatListStyle}
                showsVerticalScrollIndicator = {true}
                data={shareList}
                renderItem={({item}) =>(
                    <ShareCardComponent
                    user_fullname = {item.user_fullname}
                    onPress ={UserListPrint}
                    user_id= {item.user_Id}
                    />
                )}
                keyExtractor={item => item.user_Id}
                />

            </View>
        </View>
    )
}

export default ShareCardScreen;