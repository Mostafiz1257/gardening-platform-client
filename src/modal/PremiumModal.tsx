// src/modal/PremiumModal.js
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from "@nextui-org/react";

const PremiumModal = ({ isOpen, onClose }) => {
    
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onClose}
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent className="bg-yellow-800">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Premium Membership</ModalHeader>
            <ModalBody>
              <h3 className="text-md font-semibold">Advantages of Premium Membership:</h3>
              <Divider></Divider>
              <ul className="list-disc pl-5 mt-2">
                <li>Access to exclusive content</li>
                <li>Ad-free experience</li>
                <li>Priority support</li>
                <li>Custom features tailored to your needs</li>
                <li>Profile Verified</li>
              </ul>
              <p className="mt-4 text-xl font-bold">$99 for Lifetime Access</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" size="sm" className="rounded-full " variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="warning" className="rounded-full font-bold " size="sm" onPress={onClose}>
               Subscribe
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PremiumModal;
