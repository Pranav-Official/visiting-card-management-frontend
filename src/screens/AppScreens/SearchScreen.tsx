import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import colors from '../../utils/colorPallete';
import SearchBarComponent from '../../components/SearchBarComponent';
import TopBackButton from '../../components/BackButton';
import SearchListComponent from '../../components/SearchListComponet';
import { CardData, fetchSearchableList } from '../../hooks/searchListHook';
import { getLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';

function searchContacts(contacts: CardData[], searchText: string) {
  let results = [];

  contacts.forEach((contact) => {
    const matchArray = [];
    const contact_name = contact.contact_name;
    const card_names = contact.card_names;
    const emails = contact.email;
    const phone_numbers = contact.phone_number;
    const company_names = contact.company_names;
    matchArray.push([
      contact_name.indexOf(searchText) === -1 ? -1 : 0,
      contact_name.indexOf(searchText),
    ]);
  });
  return results;
}
const SearchScreen = () => {
  const [searchableList, setSearchableList] = useState<CardData[]>([]);
  const [filteredSearchableList, setFilteredSearchableList] = useState<
    CardData[]
  >([]);
  const [matchType, setMatchType] = useState<string>('');
  const [matchIndex, setMatchIndex] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    const getSearchData = async () => {
      const user_id = (await getLocalItem(Constants.USER_ID)) || '';
      const token = (await getLocalItem(Constants.USER_JWT)) || '';

      const response = await fetchSearchableList(user_id, token);
      if (response.statusCode === '200') {
        setSearchableList(
          response.data.sort((a: CardData, b: CardData) =>
            a.contact_name.localeCompare(b.contact_name),
          ),
        );
        setFilteredSearchableList(
          response.data.sort((a: CardData, b: CardData) =>
            a.contact_name.localeCompare(b.contact_name),
          ),
        );
      } else {
        console.log(response);
      }
    };
    getSearchData();
  }, []);

  useEffect(() => {
    if (searchText.length > 0) {
      console.log(searchText);
      const result = searchContacts(filteredSearchableList, searchText);
      console.log('search result =', result);
    }
  }, [searchText]);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View
        style={{
          position: 'absolute',
          paddingTop: 40,
          paddingBottom: 20,
          backgroundColor: colors['secondary-grey'],
          width: '100%',
          alignItems: 'flex-start',
        }}
      >
        <TopBackButton color={colors['primary-text']} />
      </View>
      <View style={{ marginTop: 35, marginLeft: 50 }}>
        <SearchBarComponent
          editable={true}
          value={searchText}
          setter={setSearchText}
        />
      </View>
      <View style={{ marginTop: 30, marginLeft: 40 }}>
        <FlatList
          data={filteredSearchableList}
          renderItem={({ item }) => (
            <SearchListComponent
              contactName={item.contact_name}
              matchIndex={-1}
              matchType={'none'}
            />
          )}
          keyExtractor={(item) => item.card_id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    paddingTop: 0,
    backgroundColor: colors['secondary-light'],
    height: '100%',
  },
});

export default SearchScreen;
