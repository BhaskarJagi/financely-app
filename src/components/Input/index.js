import React from "react";
import "./styles.css";

function Input({ type, label, state, setState, placeholder }) {
  return (
    <div className="input-wrapper">
      <p className="input-label">{label}</p>
      <input
        type={type}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="custom-input"
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
