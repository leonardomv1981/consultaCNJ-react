import React from 'react'
import ButtonModal from './ButtonModal'

const Modal = ({ modal, onConfirm, textModal, textButton }) => {
    if (modal === true) {
        return (
            <div className="modal">
                <p>{props.textModal}</p>
                <ButtonModal text={props.textButton} />
            </div>
        )
    } else {
        return null;
    }
}

export default Modal
