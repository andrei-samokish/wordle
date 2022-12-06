import { useContext, useEffect, useState } from "react";
import { Context } from "./Context";
import { submitHandler, usedLetterSetter } from "./Helpers";

export default function Row({ disabled, order, setAttempt }) {
  const {
    isInWord,
    setIsInWord,
    setShowWin,
    word,
    setWord,
    setCurrentBox,
    results,
    setResults,
    shake,
    setShake,
  } = useContext(Context);

  useEffect(() => {
    if (results[order].length) {
      const updateIsInWord = usedLetterSetter(isInWord, results[order], word, order);
      setIsInWord(updateIsInWord);
      if (results[order].length && results[order][0].reduce((acc, cur) => acc && cur))
        setShowWin(true);
    }
  }, [results]);

  function handleLetterInsert(index, e) {
    let newWord = JSON.parse(JSON.stringify(word));
    newWord[order][index] = e.target.value.toLowerCase();
    setWord(newWord);
  }

  async function onSubmit() {
    const result = await submitHandler(setAttempt, setWord, setCurrentBox, word, order);
    if (result.length) {
      let newResult = JSON.parse(JSON.stringify(results));
      newResult[order] = result;
      setResults(newResult);
    } else {
      let isShaking = JSON.parse(JSON.stringify(shake));
      isShaking[order] = true;
      setShake(isShaking);
    }
  }

  async function handleKeyDown(index, e) {
    if (!e.target.value && e.key === "Backspace") {
      e.target.previousElementSibling?.focus();
      setCurrentBox((prev) => (prev ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      await onSubmit();
    } else if (e.code.includes("Key") && e.target.value) {
      e.target.nextElementSibling?.focus();
      setCurrentBox((prev) => (prev === 4 ? prev : prev + 1));
    }
  }

  return (
    <div className="flex">
      {word[order].map((_el, index) => {
        return (
          <input
            value={word[order][index].replace(/[^A-Za-z\s]/g, "").toUpperCase()}
            id={`row${order}${index}`}
            key={index}
            className={`${
              shake[order] ? "animate-shake2" : ""
            } border-2 border-secondary border-solid w-12 mx-1 my-1 h-16 text-center font-bold text-white pointer-events-none text-3xl focus:outline-none focus:border-4 focus:caret-transparent ${
              results[order].length
                ? results[order][0][index]
                  ? "bg-correct border-correct"
                  : results[order][1][index]
                  ? "bg-almost border-almost"
                  : "bg-secondary"
                : "bg-primary hover:bg-black"
            }`}
            onChange={(event) => handleLetterInsert(index, event)}
            maxLength={1}
            autoFocus={index === 0}
            disabled={disabled}
            onKeyDown={async (event) => await handleKeyDown(index, event)}
            onAnimationEnd={() => setShake([false, false, false, false, false, false])}
          />
        );
      })}
    </div>
  );
}
