import React from 'react';
import {
  ActivityIndicator,
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
import Colors from '../components/Colors';
import {useAppSelector} from '../redux/store';
import {useLeadByUserQuery} from '../redux/services/leadApi';

const slideNav = [
  {name: 'Upcoming Meets'},
  {name: 'Re-sheduled'},
  {name: 'Finished'},
];

function Meetings(): React.JSX.Element {
  const [status, setStatus] = React.useState<number>(0);
  const [inputVal, setInputVal] = React.useState<string>('');
  const config = useAppSelector(state => state.config);
  const {data, isSuccess} = useLeadByUserQuery(config);

  return (
    <SafeAreaView style={{flex: 1, position: 'relative'}}>
      <View style={dashboard_styles.LoginHead}>
        <MenuHeader title="meetings" />
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

        {data && isSuccess ? (
          <FlatList
            data={data}
            renderItem={({item}) =>
              item.meeting_status === status ? (
                <SignleLeadCard
                  item={item}
                  key={item._id}
                  screen="meeting"
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
    </SafeAreaView>
  );
}

export default Meetings;
