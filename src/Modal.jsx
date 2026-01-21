import React from 'react'
import ButtonModal from './ButtonModal'

const Modal = ({ modal, onConfirm, textModal, textButton }) => {
    if (modal === true) {
        return (
            <div className="modal">
                teste
                <p>{props.textModal}</p>
                {/* <ButtonModal onClick={() => setModal(false)} /> */}
            </div>
        )
    } else {
        return null;
    }
}

export default Modal
