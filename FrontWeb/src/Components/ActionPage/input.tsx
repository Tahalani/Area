import React, { useState } from "react";

interface InputProps {
  placeholder: string;
  value: string; // Ajout de la prop value
  onChange: (value: string) => void; // Ajout de la prop onChange
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value); // Appeler la fonction onChange avec la nouvelle valeur
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="mb-6 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
    />
  );
};

export default Input;
