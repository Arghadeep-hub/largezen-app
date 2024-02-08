import React from 'react';
import {
  DateTimePickerAndroid,
  AndroidNativeProps,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {leads_styles} from '../../styles/leads.styles';
import Colors from '../Colors';
import Icons from '../Icons';
import {Button} from 'react-native-paper';
import {AccordianProps} from './AccordianItems';
import {PhoneNumber} from 'react-native-contacts';

interface ContactCardPros extends AccordianProps {
  numbers: PhoneNumber;
  clicked: boolean;
}

function ContactCard({
  item,
  numbers,
  clicked,
  handleClick,
}: ContactCardPros): React.JSX.Element {
  const [date, setDate] = React.useState<Date>(new Date());
  const [isExpand, setIsExpand] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');
  const [needed, setNeeded] = React.useState<string>('');

  React.useEffect(() => {
    setName(item.displayName);
    setPhone(numbers.number);
  }, [item.displayName, numbers.number]);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date): void => {
    if (event.type === 'set' && selectedDate) setDate(selectedDate);
  };

  const showMode = (currentMode: AndroidNativeProps['mode']): void => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: false,
    });
  };

  return (
    <View style={leads_styles.itemGroup}>
      <TouchableOpacity
        style={leads_styles.itemHeading}
        onPress={() => setIsExpand(!isExpand)}>
        <View>
          <Text style={leads_styles.titleFont}>{item.displayName}</Text>
          <Text>{numbers.number}</Text>
        </View>
        <Icons
          name={isExpand ? 'upcircleo' : 'downcircleo'}
          color={Colors.gray}
        />
      </TouchableOpacity>
      {isExpand && (
        <React.Fragment>
          <View style={leads_styles.itemBody}>
            <View style={leads_styles.accordianInputBox}>
              <Text style={leads_styles.accordianInputTitle}>Name:</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                style={leads_styles.accordianInputText}
              />
            </View>

            <View style={leads_styles.accordianInputBox}>
              <Text style={leads_styles.accordianInputTitle}>Phone:</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                style={leads_styles.accordianInputText}
              />
            </View>

            <View style={leads_styles.accordianInputBox}>
              <Text style={leads_styles.accordianInputTitle}>
                Meeting Date:
              </Text>
              <TextInput
                editable={false}
                value={date.toDateString()}
                placeholderTextColor={Colors.gray}
                style={leads_styles.accordianInputText}
              />
              <TouchableOpacity onPress={() => showMode('date')}>
                <Text style={leads_styles.dateTimeSetButton}>Set Date</Text>
              </TouchableOpacity>
            </View>

            <View style={leads_styles.accordianInputBox}>
              <Text style={leads_styles.accordianInputTitle}>
                Meeting Time:
              </Text>
              <TextInput
                editable={false}
                value={date.toLocaleTimeString()}
                placeholderTextColor={Colors.gray}
                style={leads_styles.accordianInputText}
              />
              <TouchableOpacity onPress={() => showMode('time')}>
                <Text style={leads_styles.dateTimeSetButton}>Set Time</Text>
              </TouchableOpacity>
            </View>

            <View style={leads_styles.accordianInputBox}>
              <Text style={leads_styles.accordianInputTitle}>Address:</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholderTextColor={Colors.gray}
                style={leads_styles.accordianInputText}
                placeholder="AD 331/E, Kestopur, Kol-102"
              />
            </View>

            <View style={leads_styles.accordianInputBox}>
              <Text style={leads_styles.accordianInputTitle}>Needed:</Text>
              <TextInput
                value={needed}
                onChangeText={setNeeded}
                placeholderTextColor={Colors.gray}
                style={leads_styles.accordianInputText}
                placeholder="1BHK, 440 sqft, Matigara, Siliguri"
              />
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingHorizontal: 10,
            }}>
            <Button
              textColor={Colors.blue}
              style={leads_styles.accordianButton}
              onPress={() =>
                handleClick({
                  name,
                  phone,
                  address,
                  needed,
                  meeting: date,
                })
              }
              disabled={clicked}>
              Make New Lead
            </Button>
          </View>
        </React.Fragment>
      )}
    </View>
  );
}

export default ContactCard;
