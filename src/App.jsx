import { useEffect, useState } from "react";
import { Context } from "./Context";
import Field from "./Field";
import GuidePortal from "./Guide";
import Header from "./Header";
import Letters from "./Letters";
import WinPortal from "./Win";

export default function App() {
  // keyboard letter indicator
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
  // submited words from rows
  const [word, setWord] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  // results of contract call
  const [results, setResults] = useState([[], [], [], [], [], []]);
  // number of current attempt
  const [attempt, setAttempt] = useState(0);
  // shaking animation toggler
  const [shake, setShake] = useState([false, false, false, false, false, false]);
  // number of current letter box within one row
  const [currentBox, setCurrentBox] = useState(0);

  // portal togglers
  const [showGuide, setShowGuide] = useState(true);
  const [showWin, setShowWin] = useState(false);

  const [didWin, setDidWin] = useState(false);

  useEffect(() => {
    document.getElementById("row00").focus();
  }, [showGuide]);

  useEffect(() => {
    if (showWin === true) setDidWin(true);
  }, [showWin]);

  return (
    <>
      <GuidePortal show={showGuide} setShow={setShowGuide} />
      <WinPortal show={showWin} setShow={setShowWin} attempt={attempt} />
      <fieldset disabled={showGuide || showWin || didWin}>
        <div className="flex flex-col items-center">
          <Header />
          <Context.Provider
            value={{
              isInWord,
              setIsInWord,
              setShowWin,
              word,
              setWord,
              currentBox,
              setCurrentBox,
              attempt,
              setAttempt,
              results,
              setResults,
              shake,
              setShake,
            }}>
            <Field />
            <Letters />
          </Context.Provider>
        </div>
      </fieldset>
    </>
  );
}
