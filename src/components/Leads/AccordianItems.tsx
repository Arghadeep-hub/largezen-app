import React from 'react';

import {Contact} from 'react-native-contacts';
import {addContactProp} from './ContactModal';
import ContactCard from './ContactCard';

export interface AccordianProps {
  clicked: boolean;
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
  clicked,
  handleClick,
}: AccordianProps): React.JSX.Element {
  return (
    <>
      {item.phoneNumbers.flatMap((numbers, id) => (
        <ContactCard
          key={id}
          numbers={numbers}
          item={item}
          clicked={clicked}
          handleClick={handleClick}
        />
      ))}
    </>
  );
}

export default AccordianItems;
