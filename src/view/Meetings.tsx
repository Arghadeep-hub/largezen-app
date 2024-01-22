import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MenuHeader from '../components/MenuHeader';
import {dashboard_styles} from '../styles/dashboard_styles';
import {meeting_styles} from '../styles/meeting.styles';
import SignleLeadCard from '../components/Leads/SignleLeadCard';
import {useSelector} from 'react-redux';
import {storeStracture} from '../redux/store';
import Colors from '../components/Colors';

const slideNav = [
  {name: 'Upcoming Meets'},
  {name: 'Re-sheduled'},
  {name: 'Finished'},
];

function Meetings(): React.JSX.Element {
  const [status, setStatus] = React.useState<number>(0);
  const [inputVal, setInputVal] = React.useState<string>('');
  const getAllLeads = useSelector(
    (state: storeStracture) => state.leads.collections,
  );

  return (
    <SafeAreaView style={{flex: 1, position: 'relative'}}>
      <View style={dashboard_styles.LoginHead}>
        <MenuHeader title="Meetings" />
        <Text style={dashboard_styles.paragrapg}>Welcome to Meetings</Text>
      </View>

      <View style={meeting_styles.container}>
        <TextInput
          style={meeting_styles.itemInputBox}
          value={inputVal}
          onChangeText={setInputVal}
          placeholder="Search Leads..."
          placeholderTextColor={Colors.gray}
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
                  meeting_styles.buttonStyle,
                  status === id && meeting_styles.buttonStyleActive,
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={getAllLeads}
          renderItem={({item}) =>
            item.meeting_status === status ? (
              <SignleLeadCard
                item={item}
                key={item.id}
                screen="meeting"
                status={status}
                setStatus={setStatus}
              />
            ) : null
          }
          keyExtractor={item => item.id}
          style={{height: Dimensions.get('window').height - 220}}
        />
      </View>
    </SafeAreaView>
  );
}

export default Meetings;
