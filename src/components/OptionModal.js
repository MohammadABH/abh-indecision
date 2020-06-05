import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) =>  (
		<Modal
		isOpen={!!props.selectedoption}
		contentLabel="Selected Option"
		onRequestClose={props.handleCloseModal}
		closeTimeoutMS={200}
		className="modal"
		>
			<h3 className="modal__title">Selected Option</h3>
			{props.selectedoption && <p className="modal__body">{props.selectedoption}</p>}
			<button className="button" onClick={props.handleCloseModal}>Okay</button>
		</Modal>
);

export default OptionModal;