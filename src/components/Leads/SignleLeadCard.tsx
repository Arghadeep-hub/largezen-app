import * as React from 'react';
import {ToastAndroid, TouchableOpacity, View} from 'react-native';
import {leads_styles} from '../../styles/leads.styles';
import {Text} from 'react-native-paper';
import Icons from '../Icons';
import Colors from '../Colors';
import {
  useDeleteLeadByUserMutation,
  useUpdateLeadByUserMutation,
} from '../../redux/services/leadApi';
import {useAppSelector} from '../../redux/store';
import {contact} from '../../models/common';
import {
  AndroidNativeProps,
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
// import RNCalendarEvents from 'react-native-calendar-events';

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
  const [date, setDate] = React.useState<Date>(new Date(item.meeting_date));
  const token = useAppSelector(state => state.config.token);
  const [updateLeadByUser] = useUpdateLeadByUserMutation();
  const [deleteLeadByUser] = useDeleteLeadByUserMutation();

  const nextStatus = React.useCallback(
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

  const prevStatus = React.useCallback(
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

  const deleteStatus = React.useCallback(
    async (id: string) => {
      if (screen === 'meeting' && item?.lead_status < 4) {
        ToastAndroid.show('❌ Deal is not closed yet', ToastAndroid.SHORT);
        return;
      }
      if (screen === 'leads' && item?.meeting_status < 2) {
        ToastAndroid.show('❌ Meeting is not finished yet', ToastAndroid.SHORT);
        return;
      }
      const res: any = await deleteLeadByUser({token, id});
      (res?.error &&
        ToastAndroid.show('❌ Unable to delete lead', ToastAndroid.SHORT)) ||
        ToastAndroid.show('✌ Lead has been Deleted.', ToastAndroid.SHORT);

      setStatus(0);
      return;
    },
    [
      deleteLeadByUser,
      item?.lead_status,
      item?.meeting_status,
      screen,
      setStatus,
      token,
    ],
  );

  const onChange = React.useCallback(
    async (event: DateTimePickerEvent, selectedDate?: Date) => {
      // const {name, _id, meeting_date, address} = item;

      if (event.type === 'set' && selectedDate) {
        const res: any = await updateLeadByUser({
          token,
          id: item._id,
          props: {meeting_date: selectedDate},
        });

        (res?.error &&
          ToastAndroid.show(
            '❌ Unable to upadte meeting',
            ToastAndroid.SHORT,
          )) ||
          ToastAndroid.show('✌ Meeting has been updated.', ToastAndroid.SHORT);

        // if (res?.data) {
        //   await RNCalendarEvents.saveEvent(name, {
        //     id: String(),
        //     startDate: String(meeting_date),
        //     endDate: '2024-08-19T19:26:00.000Z',
        //     notes: address,
        //   });
        // }
        setDate(selectedDate);
        return;
      }
    },
    [item._id, token, updateLeadByUser],
  );

  const showMode = React.useCallback(
    (currentMode: AndroidNativeProps['mode']): void => {
      DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: currentMode,
        is24Hour: false,
      });
    },
    [date, onChange],
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

      {screen === 'meeting' && status === 1 && (
        <View style={leads_styles.buttonIconContent}>
          <TouchableOpacity
            style={leads_styles.buttonIconVertical}
            onPress={() => showMode('date')}>
            <Icons name="calendar" color={Colors.gray} />
            <Text>Date</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={leads_styles.buttonIconVertical}
            onPress={() => showMode('time')}>
            <Icons name="clockcircleo" color={Colors.gray} />
            <Text>Time</Text>
          </TouchableOpacity>
        </View>
      )}

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
        {screen === 'meeting'
          ? status === 2 && (
              <TouchableOpacity onPress={() => deleteStatus(item._id)}>
                <Icons name="closecircle" color={Colors.danger} />
              </TouchableOpacity>
            )
          : status === 4 && (
              <TouchableOpacity onPress={() => deleteStatus(item._id)}>
                <Icons name="closecircle" color={Colors.danger} />
              </TouchableOpacity>
            )}
      </View>
    </View>
  );
}

export default SignleLeadCard;
