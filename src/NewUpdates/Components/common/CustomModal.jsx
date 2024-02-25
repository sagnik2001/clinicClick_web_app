import React from 'react';

import { Button, Modal, SimpleGrid } from '@mantine/core';



const CustomModal = ({
  show,
  message,
  confirmButtonLabel,
  title,
  color,
  onClick,
  onCancel,
}) => (
  <Modal opened={show} onClose={onCancel} title={title} centered>
    <Modal.Body>{message}</Modal.Body>
    <SimpleGrid cols={2}>
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onClick} color={color}>
        {confirmButtonLabel}
      </Button>
    </SimpleGrid>
  </Modal>
);

export default CustomModal;
