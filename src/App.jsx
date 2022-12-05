import { useEffect, useState } from "react";
import { Context } from "./Context";
import Field from "./Field";
import GuidePortal from "./Guide";
import Header from "./Header";
import Letters from "./Letters";
import WinPortal from "./Win";

export default function App() {
  const [isInWord, setIsInWord] = useState({
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: [],
    k: [],
    l: [],
    m: [],
    n: [],
    o: [],
    p: [],
    q: [],
    r: [],
    s: [],
    t: [],
    u: [],
    v: [],
    w: [],
    x: [],
    y: [],
    z: [],
  });

  const [showGuide, setShowGuide] = useState(true);
  const [showWin, setShowWin] = useState(false);
  const [didWin, setDidWin] = useState(false);

  useEffect(() => {
    document.getElementById("row0").focus();
  }, [showGuide]);

  useEffect(() => {
    if (showWin === true) setDidWin(true);
    console.log("win");
  }, [showWin]);

  console.log(didWin);

  return (
    <>
      <GuidePortal show={showGuide} setShow={setShowGuide} />
      <WinPortal show={showWin} setShow={setShowWin} />
      <fieldset disabled={showGuide || showWin || didWin}>
        <div className="flex flex-col items-center">
          <Header />
          <Context.Provider value={{ isInWord, setIsInWord, setShowWin }}>
            <Field />
            <Letters />
          </Context.Provider>
        </div>
      </fieldset>
    </>
  );
}
