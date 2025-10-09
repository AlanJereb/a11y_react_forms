import React from 'react'

type Props = {
  text: string;
}

const FormTitle = ({ text }: Props) => {
  return (
    <p className="text-placeholder">{text}</p>
  )
}

export default FormTitle;