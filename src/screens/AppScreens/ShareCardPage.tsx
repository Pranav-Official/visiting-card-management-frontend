import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import SearchBarComponent from '../../components/SearchBarComponent';
import ShareCardComponent from '../../components/ShareCardContactComponent';
import { listUsers } from '../../hooks/GetUserHook';
import { getLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
import MainButtonComponent from '../../components/MainButtoncomponent';

interface ShareProp {
    user_fullname: string,
    user_id: string
}

const ShareCardScreen = () => {
    const [shareList, setShareList] = useState<ShareProp[]>([]);
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = (await getLocalItem(Constants.USER_ID)) ?? '';
                const jwt_token = (await getLocalItem(Constants.USER_JWT)) ?? '';

                const result = await listUsers({ user_id, jwt_token });
                console.log('result:',result);
                setShareList(result.userResp);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log('Selected User IDs:', selectedUserIds);
    }, [selectedUserIds]); // Log selectedUserIds whenever it changes

    const handleCardPress = (user_id: string) => {
        console.log('clicked')
        if (selectedUserIds.includes(user_id)) {
            setSelectedUserIds(selectedUserIds.filter(id => id !== user_id));
        } else {
            setSelectedUserIds([...selectedUserIds, user_id]);
        }
    };

    return (
        <View style={styles.main_container}>
            <View style={styles.search_bar_container}>
                <SearchBarComponent />
            </View>
            <View style={styles.contact_area}>
                <FlatList
                    contentContainerStyle={styles.flatListStyle}
                    showsVerticalScrollIndicator={true}
                    data={shareList}
                    renderItem={({ item }) => (
                        <ShareCardComponent
                            user_fullname={item.user_fullname}
                            user_id={item.user_id}
                            onCardPress={handleCardPress}
                        />
                    )}
                    keyExtractor={item => item.user_id}
                />
            </View>
            <MainButtonComponent title={'Go Back'}></MainButtonComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    main_container: {
        width: '100%',
        flexDirection: 'column',
    },
    search_bar_container: {
        width: '100%',
    },
    flatListStyle: {
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    contact_area: {
        width: '100%'
    }
});

export default ShareCardScreen;


// import React, { useEffect, useState } from 'react';
// import { View, FlatList, StyleSheet } from 'react-native';
// import SearchBarComponent from '../../components/SearchBarComponent';
// import ShareCardComponent from '../../components/ShareCardContactComponent';
// import { listUsers } from '../../hooks/GetUserHook';
// import { getLocalItem } from '../../utils/Utils';
// import Constants from '../../utils/Constants';

// interface ShareProp{
//     user_fullname:string,
//     user_Id:string
// }

// const ShareCardScreen = () => {
//     const [shareList, setShareList] = useState<ShareProp[]>([]);
//     const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]); // State to store selected user IDs

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const user_id = (await getLocalItem(Constants.USER_ID)) ?? '';
//                 const jwt_token = (await getLocalItem(Constants.USER_JWT)) ?? '';

//                 const result = await listUsers({ user_id, jwt_token });
//                 setShareList(result.userResp);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchData();
//     }, []);

//     // Function to handle card press and update selected user IDs
//     const handleCardPress = (user_Id: string) => {
//         if (selectedUserIds.includes(user_Id)) {
//             console.log('user id selected is',user_Id)
//             setSelectedUserIds(selectedUserIds.filter(id => id !== user_Id)); // Remove userId from array if already selected
//         } else {
//             setSelectedUserIds([...selectedUserIds, user_Id]); // Add userId to array if not selected
//         }
//         console.log('selected user ids are:',selectedUserIds);
//     };

//     return (
//         <View style={styles.main_container}>
//             <View style={styles.search_bar_container}>
//                 <SearchBarComponent />
//             </View>
//             <View style={styles.contact_area}>
//                 <FlatList
//                     contentContainerStyle={styles.flatListStyle}
//                     showsVerticalScrollIndicator={true}
//                     data={shareList}
//                     renderItem={({ item }) => (
//                         <ShareCardComponent
//                             user_fullname={item.user_fullname}
//                             user_id={item.user_Id}
//                             onCardPress={handleCardPress} // Pass the handleCardPress function as a prop
//                         />
//                     )}
//                     keyExtractor={item => item.user_Id}
//                 />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     main_container : {
//         width:'100%',
//         flexDirection:'column',        
//     },
//     search_bar_container:{
//         width:'100%',
//     },
//     flatListStyle:{
//         padding:10,
//         marginTop:10,
//         marginBottom:10,
//     },
//     contact_area:{
//         width:'100%'
//     }

// })

// export default ShareCardScreen;




