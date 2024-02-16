// import {
//   BottomTabScreenProps,
//   BottomTabNavigationProp,
// } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {
  ActivityIndicator,
  Dimensions,
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
import MenuHeader from '../components/MenuHeader';
import {dashboard_styles} from '../styles/dashboard_styles';
import Contact from 'react-native-contacts';
import {leads_styles} from '../styles/leads.styles';
import Colors from '../components/Colors';
import ContactModal from '../components/Leads/ContactModal';
import {useAppSelector} from '../redux/store';
import SignleLeadCard from '../components/Leads/SignleLeadCard';
import {useLeadByUserQuery} from '../redux/services/leadApi';

// type DetailsProps = BottomTabScreenProps<RootStackParamList, 'Leads'>;

const slideNav = [
  {name: 'New Leads'},
  {name: 'Follow-up'},
  {name: 'Visit'},
  {name: 'Negotiations'},
  {name: 'Deal Close'},
];

function Leads(): React.JSX.Element {
  const isFocused = useIsFocused();
  const config = useAppSelector(state => state.config);
  const [status, setStatus] = React.useState<number>(0);
  const [contactList, setContactList] = React.useState<any[]>([]);
  const [inputVal, setInputVal] = React.useState<string>('');
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const getAllLeads = useAppSelector(state => state.leads.collections);
  const {data, isSuccess} = useLeadByUserQuery(config);

  React.useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(res => {
      if (res === 'granted') {
        Contact.getAll()
          .then(contacts => {
            // work with contacts
            setContactList(contacts);
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  }, [getAllLeads, isFocused]);

  return (
    <SafeAreaView style={{flex: 1, position: 'relative'}}>
      <View style={dashboard_styles.LoginHead}>
        <MenuHeader title="leads" />
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
                style={[
                  leads_styles.buttonStyle,
                  status === id && leads_styles.buttonStyleActive,
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {data && isSuccess ? (
          <FlatList
            data={data}
            scrollEnabled={true}
            renderItem={({item}) =>
              item.lead_status === status ? (
                <SignleLeadCard
                  item={item}
                  key={item._id}
                  screen="leads"
                  status={status}
                  setStatus={setStatus}
                />
              ) : null
            }
            keyExtractor={item => item._id}
            style={{height: Dimensions.get('window').height - 220}}
          />
        ) : (
          <ActivityIndicator size="large" color={Colors.blue} />
        )}
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

export default React.memo(Leads);
