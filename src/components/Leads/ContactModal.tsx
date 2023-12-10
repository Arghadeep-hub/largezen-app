import React from 'react';
import {Button, FlatList, Modal, TextInput, View} from 'react-native';
import Colors from '../Colors';
import {useDispatch} from 'react-redux';
import {addLeads} from '../../redux/leadSlice';
import uuid from 'react-native-uuid';
import AccordianItems from './AccordianItems';
import {leads_styles} from '../../styles/leads_styles';

interface ModalProps {
  contactList: any[];
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function ContactModal({openModal, setOpenModal, contactList}: ModalProps) {
  const dispatch = useDispatch();

  const handleClick = (name: string, phone: number) => {
    const id = uuid.v4();
    const details = {id: String(id), name, phone, status: 0};
    dispatch(addLeads(details));
    setOpenModal(false);
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
            <AccordianItems handleClick={handleClick} item={item} />
          )}
          keyExtractor={item => item.recordID}
        />

        <Button
          title="Cancel"
          onPress={() => setOpenModal(false)}
          color={Colors.orange}
        />
      </View>
    </Modal>
  );
}

export default ContactModal;
