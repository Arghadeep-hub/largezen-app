import React, {useCallback} from 'react';
import {ToastAndroid, TouchableOpacity, View} from 'react-native';
import {leads_styles} from '../../styles/leads.styles';
import {Text} from 'react-native-paper';
import Icons from '../Icons';
import {contact} from '../../redux/slices/leadSlice';
import Colors from '../Colors';
import {useUpdateLeadByUserMutation} from '../../redux/services/leadApi';
import {useAppSelector} from '../../redux/store';

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
  const date = new Date(item.meeting_date);
  const token = useAppSelector(state => state.config.token);
  const [updateLeadByUser] = useUpdateLeadByUserMutation();

  const nextStatus = useCallback(
    async (id: string) => {
      if (screen === 'leads' && status < 4) {
        const leadStatus = {lead_status: status + 1};
        const res: any = await updateLeadByUser({token, id, props: leadStatus});

        (res?.error &&
          ToastAndroid.show('❌ Unable to upadte lead', ToastAndroid.SHORT)) ||
          ToastAndroid.show('✌ Lead has been updated.', ToastAndroid.SHORT);

        setStatus(status + 1);
        return;
      }

      if (screen === 'meeting' && status < 2) {
        const meetingStatus = {meeting_status: status + 1};
        const res: any = await updateLeadByUser({
          token,
          id,
          props: meetingStatus,
        });

        (res?.error &&
          ToastAndroid.show(
            '❌ Unable to upadte meeting',
            ToastAndroid.SHORT,
          )) ||
          ToastAndroid.show('✌ Meeting has been updated.', ToastAndroid.SHORT);

        setStatus(status + 1);
        return;
      }
      return;
    },
    [screen, setStatus, status, token, updateLeadByUser],
  );

  const prevStatus = useCallback(
    async (id: string) => {
      if (screen === 'leads') {
        const leadStatus = {lead_status: status - 1};
        const res: any = await updateLeadByUser({token, id, props: leadStatus});

        (res?.error &&
          ToastAndroid.show('❌ Unable to upadte lead', ToastAndroid.SHORT)) ||
          ToastAndroid.show('✌ Lead has been updated.', ToastAndroid.SHORT);

        setStatus(status - 1);
        return;
      }

      if (screen === 'meeting') {
        const meetingStatus = {meeting_status: status - 1};
        const res: any = await updateLeadByUser({
          token,
          id,
          props: meetingStatus,
        });

        (res?.error &&
          ToastAndroid.show(
            '❌ Unable to upadte meeting',
            ToastAndroid.SHORT,
          )) ||
          ToastAndroid.show('✌ Meeting has been updated.', ToastAndroid.SHORT);

        setStatus(status - 1);
        return;
      }
      return;
    },
    [screen, setStatus, status, token, updateLeadByUser],
  );

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
