import React, {useState} from 'react';
import {
  Button,
  FlatList,
  Modal,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import Colors from '../Colors';
import AccordianItems from './AccordianItems';
import {leads_styles} from '../../styles/leads.styles';
import {useAppSelector} from '../../redux/store';
import {useAddLeadByUserMutation} from '../../redux/services/leadApi';

interface ModalProps {
  contactList: any[];
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface addContactProp {
  name: string;
  phone: string;
  address: string;
  needed: string;
  meeting: Date;
}

function ContactModal({
  openModal,
  setOpenModal,
  contactList,
}: ModalProps): React.JSX.Element {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const config = useAppSelector(state => state.config);
  const [addLeadByUser] = useAddLeadByUserMutation();

  const handleClick = async ({
    name,
    phone,
    address,
    needed,
    meeting,
  }: addContactProp): Promise<number> => {
    setIsClicked(true);
    if (name === '') {
      setIsClicked(false);
      ToastAndroid.show('Name is required', ToastAndroid.SHORT);
      return 0;
    }

    if (phone === '') {
      setIsClicked(false);
      ToastAndroid.show('Phone is required', ToastAndroid.SHORT);
      return 0;
    }

    const res: any = await addLeadByUser({
      ...config,
      name,
      phone: String(phone).split(' ').join(''),
      address,
      needed,
      meeting,
    });

    (res?.data && ToastAndroid.show('✌ New lead added', ToastAndroid.SHORT)) ||
      ToastAndroid.show('❌ Unable lead added', ToastAndroid.SHORT);
    setOpenModal(false);
    setIsClicked(false);
    return 1;
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={openModal}
      onRequestClose={() => {
        setOpenModal(!openModal);
      }}>
      <View style={{flex: 1, margin: 10}}>
        <TextInput
          style={leads_styles.itemInputBox}
          placeholder="Search Contacts..."
          placeholderTextColor={Colors.blue}
        />
        <FlatList
          data={contactList}
          renderItem={({item}) => (
            <AccordianItems
              handleClick={handleClick}
              item={item}
              clicked={isClicked}
            />
          )}
          keyExtractor={item => item.recordID}
        />

        <Button
          title="Cancel"
          onPress={() => setOpenModal(false)}
          color={Colors.orange}
          disabled={isClicked}
        />
      </View>
    </Modal>
  );
}

export default ContactModal;
