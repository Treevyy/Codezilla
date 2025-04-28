"use client"

import ModalBase from "@/components/ModalBase";

interface ResponseModalProps {
 isOpen: boolean;
 onClose: () => void;
 text: string;

}

const ResponseModal = ({ isOpen, onClose, text }: ResponseModalProps) => {
	return (
		<ModalBase
		open={isOpen}
		onOpenChange={(open: boolean) => { if(!open) onClose(); }}
		title="Narration"
		description={text}
		>
		</ModalBase>		
	);
};
export default ResponseModal;