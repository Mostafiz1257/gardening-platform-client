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
import { useCreatePaymentMutation } from "../redux/features/paymentApi";
import { useGetUser } from "../hooks/auth.hooks";

// Define the prop types
interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void; // Function type for closing the modal
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  const { data } = useGetUser();
  const userInfo = data?.data;
  const [createPayment] = useCreatePaymentMutation();
  const handlePayment = async () => {
    const paymentObject = {
      totalAmount: 150.75,
      customerName: userInfo?.name,
      customerEmail: userInfo?.email,
    };
    try {
      const res = await createPayment(paymentObject).unwrap();
      window.location.href = res?.data?.payment_url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      backdrop='opaque'
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
      isOpen={isOpen}
      onOpenChange={onClose} // This is passed the function to handle modal close
    >
      <ModalContent className=''>
        {() => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Premium Membership
            </ModalHeader>
            <ModalBody className=''>
              <h3 className='text-md font-semibold'>
                Advantages of Premium Membership:
              </h3>
              <Divider />
              <ul className='list-disc pl-5 mt-2'>
                <li>Access to exclusive content</li>
                <li>Ad-free experience</li>
                <li>Priority support</li>
                <li>Custom features tailored to your needs</li>
                <li>Profile Verified</li>
              </ul>
              <p className='mt-4 text-xl font-bold'>
                {" "}
                Tk 50.00 for Lifetime Access
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                className='rounded-full'
                color='danger'
                size='sm'
                variant='light'
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                onClick={handlePayment}
                className='rounded-full font-bold'
                color='warning'
                size='sm'
                onPress={onClose}
              >
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
