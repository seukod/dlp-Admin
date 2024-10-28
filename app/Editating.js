import React from 'react';
import { Td } from '@chakra-ui/react';

const EditableCell = ({ isEditing, value, onChange }) => {
  return (
    <Td>
      {isEditing ? (
        <input 
          type="text" 
          value={value}
          className='camposEdit'
          onChange={onChange}
        />
      ) : (
        value
      )}
    </Td>
  );
};

export default EditableCell;