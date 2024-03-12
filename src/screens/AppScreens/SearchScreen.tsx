import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import colors from '../../utils/colorPallete';
import SearchBarComponent from '../../components/SearchBarComponent';
import TopBackButton from '../../components/BackButton';
import SearchListComponent from '../../components/SearchListComponet';
import { CardData, fetchSearchableList } from '../../hooks/searchListHook';
import { getLocalItem } from '../../utils/Utils';
import Constants from '../../utils/Constants';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type filteredList = {
  matchIndex: number;
  matchType: string;
  matchString: string;
  card_id: string;
  contact_name: string;
};

function searchContacts(contacts: CardData[], searchText: string) {
  const results: filteredList[] = [];
  contacts.forEach((contact) => {
    const match = {
      found: false,
      item_index: -1,
      string_index: -1,
      type: '',
      match_string: '',
    };
    const matchArray = [];
    const contact_name = contact.contact_name;
    const card_names = contact.card_names;
    const emails = contact.email;
    const phone_numbers = contact.phone_number;
    const company_names = contact.company_names;

    if (contact_name.toLowerCase().includes(searchText)) {
      match.found = true;
      match.item_index = contact_name.toLowerCase().indexOf(searchText);
      match.string_index = contact_name.toLowerCase().indexOf(searchText);
      match.type = 'contact_name';
      match.match_string = contact_name;
    }
    matchArray.push(match);
    for (let i = 0; i < card_names.length; i++) {
      if (card_names[i].toLowerCase().includes(searchText)) {
        match.found = true;
        match.string_index = card_names[i].toLowerCase().indexOf(searchText);
        match.type = 'card_name';
        match.match_string = card_names[i];
        matchArray.push(match);
        break;
      }
    }
    for (let i = 0; i < emails.length; i++) {
      if (emails[i].toLowerCase().includes(searchText)) {
        match.found = true;
        match.string_index = emails[i].toLowerCase().indexOf(searchText);
        match.type = 'email';
        match.match_string = emails[i];
        matchArray.push(match);
        break;
      }
    }
    for (let i = 0; i < phone_numbers.length; i++) {
      if (phone_numbers[i].toLowerCase().includes(searchText)) {
        match.found = true;
        match.string_index = phone_numbers[i].toLowerCase().indexOf(searchText);
        match.type = 'phone_number';
        match.match_string = phone_numbers[i];
        matchArray.push(match);
        break;
      }
    }
    for (let i = 0; i < company_names.length; i++) {
      if (company_names[i].toLowerCase().includes(searchText)) {
        match.found = true;
        match.string_index = company_names[i].toLowerCase().indexOf(searchText);
        match.type = 'company_name';
        match.match_string = company_names[i];
        matchArray.push(match);
        break;
      }
    }
    if (matchArray[0].type === 'contact_name') {
      results.push({
        matchIndex: matchArray[0].string_index,
        matchType: matchArray[0].type,
        matchString: matchArray[0].match_string,
        card_id: contact.card_id,
        contact_name: contact.contact_name,
      });
    } else {
      matchArray.sort((a, b) => a.string_index - b.string_index);
      results.push({
        matchIndex: matchArray[0].string_index,
        matchType: matchArray[0].type,
        matchString: matchArray[0].match_string,
        card_id: contact.card_id,
        contact_name: contact.contact_name,
      });
    }
  });
  return results
    .sort((a, b) => a.matchIndex - b.matchIndex)
    .filter((result) => result.matchIndex !== -1);
}
const SearchScreen = () => {
  const [searchableList, setSearchableList] = useState<CardData[]>([]);
  const [filteredSearchableList, setFilteredSearchableList] = useState<
    filteredList[]
  >([]);
  const [searchText, setSearchText] = useState<string>('');
  const navigation = useNavigation<NavigationProp<any>>();

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
      } else {
        console.log(response);
      }
    };
    getSearchData();
  }, []);

  useEffect(() => {
    if (searchText.length > 2) {
      console.log(searchText);
      const result = searchContacts(searchableList, searchText.toLowerCase());
      console.log('search result =', result);
      setFilteredSearchableList(result);
    } else {
      setFilteredSearchableList([]);
    }
  }, [searchText]);

  const navigateToCardList = (card_id: string, contact_name: string) => {
    navigation.navigate('CardStack', {
      screen: 'CardListScreen',
      params: { card_id: card_id, name: contact_name },
    });
  };

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
        {filteredSearchableList.length > 0 || searchText.length > 2 ? (
          <FlatList
            data={filteredSearchableList}
            renderItem={({ item }) => (
              <SearchListComponent
                contactName={item.contact_name}
                matchIndex={item.matchIndex}
                matchType={item.matchType}
                matchString={item.matchString}
                matchLength={searchText.length}
                searchText={searchText}
                onPress={() =>
                  navigateToCardList(item.card_id, item.contact_name)
                }
              />
            )}
            keyExtractor={(item) => item.card_id}
          />
        ) : (
          <FlatList
            data={searchableList}
            renderItem={({ item }) => (
              <SearchListComponent
                contactName={item.contact_name}
                matchIndex={-1}
                matchType={'none'}
                matchString={''}
                matchLength={0}
                searchText={searchText}
                onPress={() =>
                  navigateToCardList(item.card_id, item.contact_name)
                }
              />
            )}
            keyExtractor={(item) => item.card_id}
          />
        )}
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
