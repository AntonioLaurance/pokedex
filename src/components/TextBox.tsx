import './TextBox.css';
import React, { forwardRef, Ref, InputHTMLAttributes } from 'react';

interface TextBoxProps extends InputHTMLAttributes<HTMLInputElement> {}

const TextBox = forwardRef(
  (props: TextBoxProps, ref: Ref<HTMLInputElement>) => {
    return <input className='TextBox' ref={ref} type="text" {...props} />;
  }
);

export default TextBox;
