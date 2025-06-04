'use client';

import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { CSSProperties, useState } from 'react';
import createProduct from '../actions/create-products';
import { CloudUpload } from '@mui/icons-material';
import { useFormStatus } from 'react-dom';

const styles: CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'background.paper',
  border: '2px solid #000',
  boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.2)',
  padding: '32px',
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

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' variant='contained' fullWidth disabled={pending}>
      {pending ? 'Creating...' : 'Submit'}
    </Button>
  );
}

export default function CreateProductModal({ open, handleClose }: CreateProductModalProps) {
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const onClose = () => {
    handleClose();
    setFileName('');
    setError('');
  };

  const handleAction = async (formData: FormData) => {
    try {
      const response = await createProduct(formData);

      if (response.error) {
        setError(response.error);
      } else {
        onClose();
      }
    } catch (err) {
      setError('An error occurred while creating the product');
      console.error(err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles}>
        <Typography variant='h6' component='h2' gutterBottom>
          Create Product
        </Typography>

        <form action={handleAction}>
          <Stack spacing={2}>
            <TextField name='name' label='Product Name' fullWidth required />

            <TextField name='description' label='Description' multiline rows={3} fullWidth />

            <TextField name='price' label='Price' type='number' fullWidth required />

            <Box>
              <Button component='label' variant='outlined' startIcon={<CloudUpload />} fullWidth>
                Upload File
                <input
                  name='image'
                  type='file'
                  style={styleInputStyles}
                  onChange={e => e.target.files && setFileName(e.target.files[0].name)}
                />
              </Button>
              <Typography variant='body2' sx={{ mt: 1 }}>
                {fileName ? `Selected file: ${fileName}` : 'No file selected'}
              </Typography>
            </Box>

            <SubmitButton />

            {error && <Typography color='error'>{error}</Typography>}
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
