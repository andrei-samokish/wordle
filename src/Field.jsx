import { useContext, useEffect, useState } from "react";
import Context from "./Context";

import Row from "./Row";

export default function Field() {
  const rows = ["", "", "", "", "", ""];

  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    document.getElementById(`row${attempt}`)?.focus();
  }, [attempt]);

  return rows.map((_el, index) => {
    return (
      <div className="flex flex-col" key={index}>
        <Row disabled={index !== attempt} setAttempt={setAttempt} order={index} attempt={attempt} />
      </div>
    );
  });
}
