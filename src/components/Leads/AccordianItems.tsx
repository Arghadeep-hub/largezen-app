import * as React from 'react';
import {Contact} from 'react-native-contacts';
import ContactCard from './ContactCard';

export interface AccordianProps {
  item: Contact;
  clicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function AccordianItems({
  item,
  clicked,
  setIsClicked,
  setOpenModal,
}: AccordianProps): React.JSX.Element {
  return (
    <>
      {item.phoneNumbers.flatMap((numbers, id) => (
        <ContactCard
          key={id}
          numbers={numbers}
          item={item}
          clicked={clicked}
          setIsClicked={setIsClicked}
          setOpenModal={setOpenModal}
        />
      ))}
    </>
  );
}

export default AccordianItems;
