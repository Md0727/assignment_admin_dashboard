import React from 'react';

interface IconInputProps {
  icon: JSX.Element;
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Define onChange type
  addCustomClass?: any
}

const FormInput: React.FC<IconInputProps> = ({ icon, type, name, placeholder, required = false, value, onChange, addCustomClass }) => (
  <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
    {icon}
    <input
      className={`pl-2 outline-none border-none w-full ${addCustomClass}`}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      required={required}
      onChange={onChange}
    />
  </div>
);

export default FormInput;
