"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

interface ShowModalProps {
  isOpen: boolean;
  onClose: () => void;
  signOut?: () => void;
}

export function ShowModal({ isOpen, onClose, signOut }: ShowModalProps) {
  return (
    <div className="text-right font-vazir ">
      <Modal
        className="text-right p-4  font-vazir"
        isOpen={isOpen}
        placement="bottom"
        onOpenChange={onClose}
      >
        <ModalContent>
          {(onCloseInner) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-red-700 font-bold ">
                خروج از حساب کاربری
              </ModalHeader>
              <ModalBody>
                <p>آیا برای خروج از حساب کاربری خود اطمینان دارید؟</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    onCloseInner?.();
                    signOut?.();
                  }}
                >
                  خروج
                </Button>
                <Button color="default" onPress={onCloseInner}>
                  بازگشت
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
