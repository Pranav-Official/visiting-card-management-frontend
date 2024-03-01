import React from 'react'
import { TextInput, View,StyleSheet, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SearchBarComponent = () => {
  return (

    <View style={styles.searchContainer}>
        <TextInput placeholder='Search Contact'style={styles.searchBarView}></TextInput>
        <TouchableOpacity style={styles.icon}><MaterialIcons name='search' color={'grey'} size={20} /></TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    searchContainer:{
    flexDirection:'row',
    height:45,
    backgroundColor: '#D9D9D9',
    borderRadius:12,
    },
    searchBarView:{
    backgroundColor: '#D9D9D9',
    borderRadius:12,
    flex:9
    },
    icon:{
    flex:1,
    alignSelf:'center',
    marginLeft:5,
    color:'#565656',
   }
});
export default SearchBarComponent
