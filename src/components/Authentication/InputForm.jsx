import React from "react";

function InputForm({ label, type, placeholder, kbAction, valueSetter }) {
  return (
    <div className="mt-2 text-gray-200">
      <label className="font-medium text-lg" htmlFor="">
        {label}
      </label>
      <input
        className="w-full border-2 border-gray-300 rounded-xl p-4 mt-2 bg-transparent placeholder-gray-500"
        type={type}
        placeholder={placeholder}
        autoComplete="on"
        autoFocus
        onKeyDown={kbAction}
        onChange={(value) => valueSetter(value.target.value)}
      />
    </div>
  );
}

export default InputForm;
