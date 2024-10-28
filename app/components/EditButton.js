import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

export default function EditButton({ onClick, isEditing }) {
  return (
    <IconButton
      icon={<EditIcon />}
      onClick={onClick}
      className="edit-button"
      aria-label="Edit button"
    />
  );
}

