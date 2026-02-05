import React from 'react'

function Button(props) {
  return <button id={props.id} onClick={props.onClick}>{props.texto}</button>;
}

export default Button
