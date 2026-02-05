import React from 'react'
import ButtonModal from './ButtonModal'

const Modal = ({ modal, setModal, data}) => {
    if (modal === true) {
        return (
            <div className="modal">
                {/* <ButtonModal onClick={() => setModal(false)} /> */}
            </div>
        )
    } else {
        return null;
    }
}

export default Modal
