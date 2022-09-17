import React, { useState, useEffect } from "react";

interface Props {
  input: { [key: string]: any };
  fillInputValue: (id: string, value: string) => void;
}

const Input: React.FC<Props> = ({ input, fillInputValue }) => {
  const renderInput = () => (
    <input
      {...input}
      className="w-full mt-2 py-1 px-2 rounded"
      onChange={(e) => fillInputValue(e.target.id, e.target.value)}
      required
    />
  );

  const renderTextArea = () => (
    <textarea
      {...input}
      className="w-full mt-2 py-1 px-2 rounded"
      rows={3}
      onChange={(e) => fillInputValue(e.target.id, e.target.value)}
      required
    ></textarea>
  );

  return <>{input.type === "text" ? renderInput() : renderTextArea()}</>;
};

export default Input;
