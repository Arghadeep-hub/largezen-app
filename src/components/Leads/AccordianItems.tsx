import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {leads_styles} from '../../styles/leads_styles';
import Colors from '../Colors';
import Icons from '../Icons';
import {Button} from 'react-native-paper';

function AccordianItems({item, handleClick}: any) {
  const [isExpand, setIsExpand] = React.useState<boolean>(false);
  return (
    <View style={leads_styles.itemGroup}>
      <TouchableOpacity
        style={leads_styles.itemHeading}
        onPress={() => setIsExpand(!isExpand)}>
        <View>
          <Text style={leads_styles.titleFont}>{item.displayName}</Text>
          <Text>{item.phoneNumbers[0]?.number}</Text>
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
                value={item.displayName}
                style={leads_styles.accordianInputText}
              />
            </View>

            <View style={leads_styles.accordianInputBox}>
              <Text style={leads_styles.accordianInputTitle}>Phone:</Text>
              <TextInput
                value={item.phoneNumbers[0]?.number}
                style={leads_styles.accordianInputText}
              />
            </View>

            <View style={leads_styles.accordianInputBox}>
              <Text style={leads_styles.accordianInputTitle}>Address:</Text>
              <TextInput
                style={leads_styles.accordianInputText}
                placeholder="AD 331/E, Kestopur, Kol-102"
                placeholderTextColor={Colors.gray}
              />
            </View>

            <View style={leads_styles.accordianInputBox}>
              <Text style={leads_styles.accordianInputTitle}>Needed:</Text>
              <TextInput
                style={leads_styles.accordianInputText}
                placeholder="1BHK, 440 sqft, Matigara, Siliguri"
                placeholderTextColor={Colors.gray}
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
                handleClick(item.displayName, item.phoneNumbers[0]?.number)
              }>
              Make New Lead
            </Button>
          </View>
        </React.Fragment>
      )}
    </View>
  );
}

export default AccordianItems;

/**
 *  <Button
                title="add"
                color={Colors.skin}
                onPress={() =>
                  handleClick(item.displayName, item.phoneNumbers[0]?.number)
                }
              />
 */
