// import {
//   BottomTabScreenProps,
//   BottomTabNavigationProp,
// } from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {
  FlatList,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import {RootStackParamList} from '../App';
import {useIsFocused} from '@react-navigation/native';
import MenuHeader from '../models/MenuHeader';
import {dashboard_styles} from '../styles/dashboard_styles';
import Contact from 'react-native-contacts';
import {leads_styles} from '../styles/leads_styles';
import Colors from '../components/Colors';
import ContactModal from '../components/Leads/ContactModal';
import {useDispatch, useSelector} from 'react-redux';
import {storeStracture} from '../redux/store';
import Icons from '../components/Icons';
import {decreaseStatus, increaseStatus} from '../redux/leadSlice';

// type DetailsProps = BottomTabScreenProps<RootStackParamList, 'Leads'>;

const slideNav = [
  {name: 'New Leads'},
  {name: 'Follow-up'},
  {name: 'Visit'},
  {name: 'Negotiations'},
  {name: 'Deal Close'},
];

function Leads() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [status, setStatus] = useState<number>(0);
  const [contactList, setContactList] = useState<any[]>([]);
  const [inputVal, setInputVal] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const getAllLeads = useSelector<storeStracture>(
    state => state.leads.collections,
  );
  // const navigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();

  const nextStatus = (id: string) => {
    dispatch(increaseStatus(id));
    status < 4 && setStatus(status + 1);
  };

  const prevStatus = (id: string) => {
    dispatch(decreaseStatus(id));
    status > 0 && setStatus(status - 1);
  };

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
        <TextInput
          style={leads_styles.itemInputBox}
          value={inputVal}
          onChangeText={setInputVal}
          placeholder="Search Leads..."
          placeholderTextColor={Colors.blue}
        />
        {/* Horizontal scroll */}
        <ScrollView
          horizontal={true}
          contentContainerStyle={{columnGap: 16}}
          style={{marginVertical: 10}}>
          {slideNav?.map((item, id) => (
            <TouchableOpacity key={id} onPress={() => setStatus(id)}>
              <Text
                style={
                  status === id
                    ? leads_styles.buttonStyleActive
                    : leads_styles.buttonStyle
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={getAllLeads}
          renderItem={({item}) =>
            item.status === status ? (
              <View
                style={[
                  leads_styles.itemHeading,
                  leads_styles.itemBody,
                  leads_styles.itemGroup,
                ]}>
                <View>
                  <Text style={leads_styles.titleFont}>{item.name}</Text>
                  <Text>{item.phone}</Text>
                </View>
                <View style={leads_styles.itemButton}>
                  {item.status !== 0 && (
                    <TouchableOpacity onPress={() => prevStatus(item.id)}>
                      <Icons name="leftcircle" color={Colors.gray} />
                    </TouchableOpacity>
                  )}

                  {item.status !== 4 && (
                    <TouchableOpacity onPress={() => nextStatus(item.id)}>
                      <Icons name="rightcircle" color={Colors.gray} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ) : null
          }
          keyExtractor={item => item.phone}
        />
      </View>

      <TouchableOpacity
        style={leads_styles.floatingBtn}
        onPress={() => setOpenModal(true)}>
        <Text style={{fontSize: 30, color: Colors.white}}>+</Text>
      </TouchableOpacity>

      <ContactModal
        contactList={contactList}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </SafeAreaView>
  );
}

export default Leads;
