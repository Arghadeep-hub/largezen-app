import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {leads_styles} from '../../styles/leads.styles';
import {Text} from 'react-native-paper';
import Icons from '../Icons';
import {
  contact,
  decreaseStatus,
  increaseStatus,
} from '../../redux/slices/leadSlice';
import Colors from '../Colors';
import {useDispatch} from 'react-redux';

interface SingleLeadProps {
  item: contact;
  status: number;
  screen: string;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
}

function SignleLeadCard({
  item,
  status,
  setStatus,
  screen,
}: SingleLeadProps): React.JSX.Element {
  const dispatch = useDispatch();
  const date = new Date(item.meeting_date);

  const nextStatus = (id: string): number => {
    if (screen === 'meeting') {
      status < 2 && setStatus(status + 1);
      console.log(id);
      return 1;
    }

    if (screen === 'leads') {
      status < 4 && setStatus(status + 1);
      console.log(id, status);
      return 1;
    }
    return 0;
  };

  const prevStatus = (id: string) => {
    dispatch(decreaseStatus({id, screen}));
    status > 0 && setStatus(status - 1);
  };

  return (
    <View
      style={[
        leads_styles.itemHeading,
        leads_styles.itemBody,
        leads_styles.itemGroup,
      ]}>
      <View>
        <Text style={leads_styles.titleFont}>{item.name}</Text>
        <Text>{screen === 'leads' ? item.phone : date.toDateString()}</Text>
        {screen === 'meeting' && <Text>{date.toLocaleTimeString()}</Text>}
      </View>
      <View style={leads_styles.itemButton}>
        {status !== 0 && (
          <TouchableOpacity onPress={() => prevStatus(item._id)}>
            <Icons name="leftcircle" color={Colors.gray} />
          </TouchableOpacity>
        )}

        {screen === 'meeting'
          ? status !== 2 && (
              <TouchableOpacity onPress={() => nextStatus(item._id)}>
                <Icons name="rightcircle" color={Colors.gray} />
              </TouchableOpacity>
            )
          : status !== 4 && (
              <TouchableOpacity onPress={() => nextStatus(item._id)}>
                <Icons name="rightcircle" color={Colors.gray} />
              </TouchableOpacity>
            )}
      </View>
    </View>
  );
}

export default SignleLeadCard;
