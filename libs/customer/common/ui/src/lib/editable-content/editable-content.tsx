import { Box, Fade } from '@mui/material';
import { ReactNode } from 'react';

export interface EditableContentProps {
  isEditing: boolean;
  view: ReactNode;
  edit: ReactNode;
}

export const EditableContent = ({ isEditing, view, edit }: EditableContentProps) => {
  return (
    <Box position="relative" sx={{ width: '100%' }}>
      {isEditing ? (
        <Fade in={isEditing}>
          <Box>{edit}</Box>
        </Fade>
      ) : (
        <Fade in={!isEditing}>
          <Box>{view}</Box>
        </Fade>
      )}
    </Box>
  );
};
