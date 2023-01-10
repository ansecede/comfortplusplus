import React from "react";
import { aboutLangProps } from "../../config/constants";

function Instructions({ language }) {
  return (
    <>
      <h1 className="font-semibold text-5xl">
        {aboutLangProps[language]["header"]}
      </h1>
      <div className="p-10 px-20 whitespace-pre-wrap text-justify">
        <p>{aboutLangProps[language]["instructions"]}</p>
      </div>
      <label className="mr-2">{aboutLangProps[language]["label"]}</label>
    </>
  );
}

export default Instructions;
