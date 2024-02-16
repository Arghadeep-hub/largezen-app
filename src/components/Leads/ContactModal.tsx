import React, {useState} from 'react';
import {Button, FlatList, Modal, TextInput, View} from 'react-native';
import Colors from '../Colors';
import AccordianItems from './AccordianItems';
import {leads_styles} from '../../styles/leads.styles';

interface ModalProps {
  contactList: any[];
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function ContactModal({
  openModal,
  setOpenModal,
  contactList,
}: ModalProps): React.JSX.Element {
  const [isClicked, setIsClicked] = useState<boolean>(false);

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
              item={item}
              clicked={isClicked}
              setIsClicked={setIsClicked}
              setOpenModal={setOpenModal}
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
