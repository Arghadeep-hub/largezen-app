import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MenuHeader from '../components/MenuHeader';
import {dashboard_styles} from '../styles/dashboard_styles';
import {profile_styles} from '../styles/profile_sttyles';
import {useAppSelector} from '../redux/store';
import {
  useSingleUserDetailsQuery,
  useUpdateSingleUserMutation,
} from '../redux/services/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [fName, setFName] = useState<string>('');
  const [lName, setLName] = useState<string>('');
  const [emails, setEmails] = useState<string>('');
  const [phones, setPhones] = useState<string>('');
  const config = useAppSelector(state => state.config);
  const {data, isSuccess} = useSingleUserDetailsQuery(config);
  const [updateSingleUser] = useUpdateSingleUserMutation();

  useEffect(() => {
    if (isSuccess) {
      const {first_name, last_name, email, phone} = data;
      setFName(first_name);
      setLName(last_name);
      setEmails(email);
      setPhones(phone);
    }
  }, [data, isSuccess]);

  const handleSave = useCallback(async () => {
    if (isEdit) {
      const {first_name, last_name, phone} = data;
      if (fName === '' || lName === '' || emails === '' || phones === '') {
        ToastAndroid.show('❌ All the fields are require', ToastAndroid.SHORT);
        setIsEdit(!isEdit);
        return;
      }
      if (fName === first_name && lName === last_name && phones === phone) {
        ToastAndroid.show('❌ Nothing to upadte profile', ToastAndroid.SHORT);
        setIsEdit(!isEdit);
        return;
      }

      const props = {
        first_name: fName,
        last_name: lName,
        email: emails,
        phone: phones,
      };
      const res: any = await updateSingleUser({
        token: config.token,
        user_id: config.user_id,
        props,
      });

      (res?.error &&
        ToastAndroid.show('❌ Unable to upadte profile', ToastAndroid.SHORT)) ||
        ToastAndroid.show('✌ Profile has been updated.', ToastAndroid.SHORT);
      res?.data &&
        (await AsyncStorage.setItem(
          'auth-data',
          JSON.stringify({
            user_id: res?.data.id,
            name: res?.data.first_name + ' ' + res?.data.last_name,
            role: res?.data.role,
            token: config.token,
          }),
        ));
      setIsEdit(!isEdit);
      return;
    }
    setIsEdit(!isEdit);
    return;
  }, [config, data, emails, fName, isEdit, lName, phones, updateSingleUser]);

  return (
    <SafeAreaView style={profile_styles.container}>
      <View style={dashboard_styles.LoginHead}>
        <MenuHeader title="profile" />
        <Text style={dashboard_styles.paragrapg}>Welcome to Profile</Text>
      </View>

      <View style={profile_styles.inputBody}>
        <View style={profile_styles.inputWrapper}>
          <Text style={profile_styles.inputText}>First Name</Text>
          <TextInput
            keyboardType="name-phone-pad"
            defaultValue={isSuccess ? fName : 'Loading...'}
            style={profile_styles.inputFiled}
            onChangeText={setFName}
            editable={isEdit}
          />
        </View>

        <View style={profile_styles.inputWrapper}>
          <Text style={profile_styles.inputText}>Last Name</Text>
          <TextInput
            keyboardType="name-phone-pad"
            defaultValue={isSuccess ? lName : 'Loading...'}
            style={profile_styles.inputFiled}
            onChangeText={setLName}
            editable={isEdit}
          />
        </View>

        <View style={profile_styles.inputWrapper}>
          <Text style={profile_styles.inputText}>E-mail</Text>
          <TextInput
            keyboardType="email-address"
            defaultValue={isSuccess ? emails : 'Loading...'}
            style={profile_styles.inputFiled}
            onChangeText={setEmails}
            editable={false}
          />
        </View>

        <View style={profile_styles.inputWrapper}>
          <Text style={profile_styles.inputText}>Phone</Text>
          <TextInput
            keyboardType="number-pad"
            defaultValue={isSuccess ? String(phones) : 'Loading...'}
            style={profile_styles.inputFiled}
            onChangeText={setPhones}
            editable={isEdit}
          />
        </View>
      </View>

      {isSuccess && data && (
        <View style={profile_styles.saveButton}>
          <TouchableOpacity
            style={[
              profile_styles.saveButtonBody,
              isEdit
                ? profile_styles.saveButtonBodyBlue
                : profile_styles.saveButtonBodyGray,
            ]}
            onPress={handleSave}>
            <Text
              style={[
                profile_styles.saveButtonText,
                isEdit
                  ? profile_styles.saveButtonTextBlue
                  : profile_styles.saveButtonTextGray,
              ]}>
              {isEdit ? 'Save' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;
