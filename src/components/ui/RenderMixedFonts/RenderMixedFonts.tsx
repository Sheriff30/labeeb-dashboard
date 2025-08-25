import React, { JSX } from "react";

type RenderMixedFontsProps = {
  text: string;
  numberClass?: string;
  textClass?: string;
};

export default function RenderMixedFonts({
  text,
  numberClass = "font-roboto",
  textClass,
}: RenderMixedFontsProps): JSX.Element {
  const parts = text?.split(/(\d+)/);

  return (
    <>
      {parts?.map((part, index) => {
        if (/\d+/.test(part)) {
          return (
            <span key={index} className={numberClass}>
              {part}
            </span>
          );
        } else if (part.trim() !== "") {
          return (
            <span key={index} className={textClass}>
              {part}
            </span>
          );
        }
        return null;
      })}
    </>
  );
}
