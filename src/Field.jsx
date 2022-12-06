import { useContext } from "react";
import { useEffect, useState } from "react";
import { Context } from "./Context";

import Row from "./Row";

export default function Field() {
  const { attempt, setAttempt } = useContext(Context);

  useEffect(() => {
    document.getElementById(`row${attempt}0`)?.focus();
  }, [attempt]);

  document.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });

  return new Array(6).fill("").map((_el, index) => {
    return (
      <div className="flex flex-col" key={index}>
        <Row disabled={index !== attempt} setAttempt={setAttempt} order={index} />
      </div>
    );
  });
}
