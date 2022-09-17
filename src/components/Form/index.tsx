import React, { useState, useEffect } from "react";
/** Component */
import Input from "../Input";

interface Props {
  inputs: { [key: string]: any }[];
  setInputs: React.Dispatch<React.SetStateAction<{ [key: string]: any }[]>>;
  submitForm: (e: any) => void;
  btnName: string;
}

const Form: React.FC<Props> = ({ inputs, setInputs, submitForm, btnName }) => {
  const fillInputValue = (id: string, value: string): void => {
    const newInputs = inputs.map((input: { [key: string]: any }) => {
      if (input.id === id) {
        return {
          ...input,
          value,
        };
      }
      return {
        ...input,
      };
    });

    setInputs(newInputs);
  };

  return (
    <form className="w-full h-full" onSubmit={submitForm}>
      {inputs.map((input: { [key: string]: any }, inputIdx: number) => (
        <div key={inputIdx} className="block mb-3">
          <label className="font-bold text-lg text-sky-700">
            {input.label}
          </label>
          <Input
            input={{
              name: input.name,
              id: input.id,
              value: input.value,
              type: input.type,
            }}
            fillInputValue={fillInputValue}
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-white shadow rounded px-3 py-2 font-bold mt-3"
      >
        {btnName}
      </button>
    </form>
  );
};

export default Form;
