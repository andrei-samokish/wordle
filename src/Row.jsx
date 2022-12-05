import { useContext, useEffect, useState } from "react";
import { Context } from "./Context";
import wordle from "./ETHconnect/contract";

export default function Row({ disabled, order, setAttempt }) {
  const [word, setWord] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const { isInWord, setIsInWord, setShowWin } = useContext(Context);

  useEffect(() => {
    let updateIsInWord = JSON.parse(JSON.stringify(isInWord));
    if (result.length)
      for (let i = 0; i < word.length; i++) {
        if (result[0][i]) updateIsInWord[word[i]] = [true, false];
        else if (result[1][i] && !updateIsInWord[word[i]][0])
          updateIsInWord[word[i]] = [false, true];
        else if (!updateIsInWord[word[i]].length) updateIsInWord[word[i]] = [false, false];
      }
    // console.log(updateIsInWord);
    setIsInWord(updateIsInWord);

    if (result.length && result[0].reduce((acc, cur) => acc && cur)) setShowWin(true);
  }, [result]);

  function handleLetterInsert(index, e) {
    let newWord = [...word];
    newWord[index] = e.target.value.toLowerCase();
    setWord(newWord);
  }

  async function handleKeyDown(e) {
    if (!e.target.value && e.key === "Backspace") e.target.previousElementSibling?.focus();
    else if (e.key === "Enter") await submitHandler();
    else if (e.code.includes("Key") && e.target.value) e.target.nextElementSibling?.focus();
  }

  async function submitHandler() {
    const newResult = await wordle.submitAttempt(word.join(""));
    setResult(newResult);
    setAttempt((prev) => prev + 1);
  }

  document.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });

  return (
    <div className="flex">
      {word.map((_el, index) => {
        return (
          <input
            value={word[index].replace(/[^A-Za-z\s]/g, "").toUpperCase()}
            id={index === 0 ? `row${order}` : ""}
            key={index}
            className={`border-2 border-secondary border-solid w-12 mx-1 my-1 h-16 text-center font-bold text-white  pointer-events-none text-3xl focus:outline-none focus:border-4 focus:caret-transparent ${
              result.length
                ? result[0][index]
                  ? "bg-correct border-correct"
                  : result[1][index]
                  ? "bg-almost border-almost"
                  : "bg-secondary"
                : "bg-primary"
            }`}
            onChange={(event) => handleLetterInsert(index, event)}
            maxLength={1}
            autoFocus={index === 0}
            disabled={disabled}
            onKeyDown={async (event) => await handleKeyDown(event)}
          />
        );
      })}
    </div>
  );
}
