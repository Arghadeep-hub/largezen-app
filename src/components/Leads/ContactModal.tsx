import React from 'react';
import {Button, FlatList, Modal, View} from 'react-native';
import {Text} from 'react-native-paper';
import Colors from '../Colors';
import {leads_styles} from '../../styles/leads_styles';
import {useDispatch} from 'react-redux';
import {addLeads} from '../../redux/leadSlice';
import uuid from 'react-native-uuid';

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
        <FlatList
          data={contactList}
          renderItem={({item}) => (
            <View style={leads_styles.itemBody}>
              <View>
                <Text style={leads_styles.titleFont}>{item.displayName}</Text>
                <Text>{item.phoneNumbers[0]?.number}</Text>
              </View>
              <Button
                title="add"
                color={Colors.skin}
                onPress={() =>
                  handleClick(item.displayName, item.phoneNumbers[0]?.number)
                }
              />
            </View>
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
