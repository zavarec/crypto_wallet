import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
};

export default function UniversalModal({ isOpen, onClose, children }: ModalProps): JSX.Element {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      {children}
    </Modal>
  );
}
