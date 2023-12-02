import {
  BottomTabScreenProps,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Modal,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../App';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import MenuHeader from '../models/MenuHeader';
import {dashboard_styles} from '../styles/dashboard_styles';
import Contact from 'react-native-contacts';
import {leads_styles} from '../styles/leads_styles';
import Colors from '../components/Colors';

type DetailsProps = BottomTabScreenProps<RootStackParamList, 'Leads'>;

const slideNav = [
  {name: 'New Leads'},
  {name: 'Follow-up'},
  {name: 'Visit'},
  {name: 'Negotiations'},
  {name: 'Deal Close'},
];

function Leads({route}: DetailsProps) {
  const [contactList, setContactList] = useState<any[]>();
  const [navNum, setNavNum] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const isFocused = useIsFocused();
  // const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();

  React.useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(res => {
      if (res === 'granted') {
        Contact.getAll()
          .then(con => {
            // work with contacts
            setContactList(con);
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  }, [isFocused]);

  return (
    <SafeAreaView style={{flex: 1, position: 'relative'}}>
      <View style={dashboard_styles.LoginHead}>
        <MenuHeader title="Leads" />
        <Text style={dashboard_styles.paragrapg}>Welcome to Leads</Text>
      </View>

      <View style={leads_styles.container}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{columnGap: 16}}
          style={{marginVertical: 10}}>
          {slideNav?.map((item, id) => (
            <TouchableOpacity key={id} onPress={() => setNavNum(id)}>
              <Text
                style={
                  navNum === id
                    ? leads_styles.buttonStyleActive
                    : leads_styles.buttonStyle
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={leads_styles.floatingBtn}
        onPress={() => setOpenModal(true)}>
        <Text style={{fontSize: 30, color: Colors.white}}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={openModal}
        onRequestClose={() => {
          setOpenModal(!openModal);
        }}>
        <View style={{flex: 1, margin: 10}}>
          <FlatList
            data={contactList}
            renderItem={({item}) => (
              <View style={leads_styles.itemBody}>
                <View>
                  <Text style={leads_styles.titleFont}>{item.displayName}</Text>
                  <Text>{item.phoneNumbers[0]?.number}</Text>
                </View>
                <Button title="add" color={Colors.skin} />
              </View>
            )}
            keyExtractor={item => item.recordID}
          />

          <Button
            title="Cancel"
            onPress={() => setOpenModal(false)}
            color={Colors.orange}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default Leads;
