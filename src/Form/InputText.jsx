import React from 'react'

const InputText = ({id, label, name, setValue, value, placeholder, ...props}) => {
  return (
    <p>
      <label htmlFor={id}>{label}:</label>
      <input type="text" name={name} id={id} placeholder={placeholder} {...props
      } value={value} onChange={({target}) => setValue(target.value)}/>
    </p>
  )
}

export default InputText
