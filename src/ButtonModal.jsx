import React from 'react'

const ButtonModal = ({ setModal, ...props }) => {
  return (
    <button onClick={() => setModal(true)}>{props.text}</button>
  )
}

export default ButtonModal
