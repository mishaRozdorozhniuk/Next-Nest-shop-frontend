'use client';

import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { CSSProperties, useState } from 'react';
import { FormResponse } from '../../common/interfaces/form-response.interface';
import createProduct from '../actions/create-products';
import { CloudUpload } from '@mui/icons-material';

const styles: CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.2)',
  p: 4,
};

const styleInputStyles: CSSProperties = {
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: '0',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
};

interface CreateProductModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function CreateProductModal({ open, handleClose }: CreateProductModalProps) {
  const [response, setResponse] = useState<FormResponse>();
  const [fileName, setFileName] = useState<string>('');

  const onClose = () => {
    setResponse(undefined);
    handleClose();
    setFileName('');
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles}>
        <form
          className='w-full max-w-xs'
          action={async formData => {
            const response = await createProduct(formData);
            setResponse(response);
            if (!response.error) {
              onClose();
            }
          }}
        >
          <Stack spacing={2}>
            <TextField
              name='name'
              label='Name'
              variant='outlined'
              required
              error={!!response?.error}
              helperText={response?.error}
            />
            <TextField
              name='description'
              label='Description'
              variant='outlined'
              required
              error={!!response?.error}
              helperText={response?.error}
            />
            <TextField
              name='price'
              label='Price'
              variant='outlined'
              required
              error={!!response?.error}
              helperText={response?.error}
            />
            <Button component='label' variant='outlined' startIcon={<CloudUpload />}>
              Upload File
              <input
                type='file'
                name='image'
                style={styleInputStyles}
                onChange={e => e.target.files && setFileName(e.target.files[0].name)}
              />
            </Button>
            <Typography>{fileName ? `Selected file: ${fileName}` : 'No file selected'}</Typography>
            <Button type='submit' variant='contained'>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
