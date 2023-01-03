import React from "react";
import { aboutLangProps } from "../../config/constants";

function Instructions({ language }) {
  return (
    <>
      <h1>{aboutLangProps[language]["header"]}</h1>
      <p>{aboutLangProps[language]["instructions"]}</p>
      <label>{aboutLangProps[language]["label"]}</label>
    </>
  );
}

export default Instructions;
