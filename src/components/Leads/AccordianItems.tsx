import React from 'react';

import {Contact} from 'react-native-contacts';
import {addContactProp} from './ContactModal';
import ContactCard from './ContactCard';

export interface AccordianProps {
  item: Contact;
  handleClick: ({
    address,
    meeting,
    name,
    needed,
    phone,
  }: addContactProp) => void;
}

function AccordianItems({
  item,
  handleClick,
}: AccordianProps): React.JSX.Element {
  return (
    <>
      {item.phoneNumbers.flatMap((numbers, id) => (
        <ContactCard
          key={id}
          numbers={numbers}
          item={item}
          handleClick={handleClick}
        />
      ))}
    </>
  );
}

export default AccordianItems;
