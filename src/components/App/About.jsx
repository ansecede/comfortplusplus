import React, { useEffect, useState } from "react";
import { aboutLangProps, langOptions } from "../../config/constants";
import Instructions from "./Instructions";

function About() {
  const [selectedLang, setSelectedLang] = useState("spanish");

  useEffect(() => {
    document.title = "About - Comfort++";
  }, []);

  function CreateLangOptions({
    language,
    options = langOptions,
    props = aboutLangProps,
  }) {
    return (
      <>
        <option key="disabled" disabled>
          {props[language]["disabled"]}{" "}
        </option>
        {props[language]["labels"].map((label, index) => {
          return (
            <option
              key={options[index]}
              value={options[index]}
              // selected={options[index] === language ? true : false}
            >
              {label}
            </option>
          );
        })}
      </>
    );
  }

  return (
    <>
      <div className="mt-20 justify-center text-center">
        <Instructions language={selectedLang} />
        <select
          value={selectedLang}
          onChange={(event) => {
            setSelectedLang(event.target.value);
          }}
        >
          <CreateLangOptions language={selectedLang} />
        </select>
      </div>
    </>
  );
}

export default About;
