import { useContext } from "react";
import { Context } from "./Context";
import { submitHandler } from "./Helpers";

export default function Letters() {
  const qwertyuiop = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const asdfghjkl = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const zxcvbnm = ["z", "x", "c", "v", "b", "n", "m"];

  const {
    isInWord,
    setWord,
    currentBox,
    attempt,
    setAttempt,
    word,
    setCurrentBox,
    results,
    setResults,
    setShake,
    shake,
  } = useContext(Context);

  const tailwindClassLetter =
    "flex items-center justify-center border-2 border-secondary border-solid w-10 mx-1 my-1 h-16 cursor-pointer";

  function handleColor(el) {
    return isInWord[el].length
      ? isInWord[el][0]
        ? "bg-correct border-correct " + tailwindClassLetter
        : isInWord[el][1]
        ? "bg-almost border-almost " + tailwindClassLetter
        : "bg-secondary " + tailwindClassLetter
      : "bg-primary " + tailwindClassLetter;
  }

  // useEffect(() => {}, [currentBox]);

  function handleLetterClick(el) {
    const letterBox = document.getElementById(`row${attempt}${currentBox}`);
    let newWord = JSON.parse(JSON.stringify(word));
    newWord[attempt][currentBox] = el.toLowerCase();
    setWord(newWord);
    letterBox.nextElementSibling?.focus();
    setCurrentBox((prev) => (prev === 4 ? prev : prev + 1));
  }

  function handleDeleteClick() {
    let newWord = JSON.parse(JSON.stringify(word));
    newWord[attempt][currentBox] = "";
    setWord(newWord);

    const letterBox = document.getElementById(`row${attempt}${currentBox}`);

    letterBox.previousElementSibling?.focus();
    setCurrentBox((prev) => (prev ? prev - 1 : prev));
  }

  async function handleSubmitClick() {
    const result = await submitHandler(setAttempt, setWord, setCurrentBox, word, attempt);
    if (result.length) {
      let newResult = JSON.parse(JSON.stringify(results));
      newResult[attempt] = result;
      setResults(newResult);
    } else {
      let isShaking = JSON.parse(JSON.stringify(shake));
      isShaking[attempt] = true;
      setShake(isShaking);
    }
  }

  return (
    <div className="flex flex-col items-center my-10 text-white font-bold text-3xl">
      <div className="flex flex-row w-fit">
        {qwertyuiop.map((el, index) => (
          <div className={handleColor(el)} key={index} onClick={() => handleLetterClick(el)}>
            {el.toUpperCase()}
          </div>
        ))}
      </div>
      <div className="flex flex-row w-fit">
        {asdfghjkl.map((el, index) => (
          <div className={handleColor(el)} key={index} onClick={() => handleLetterClick(el)}>
            {el.toUpperCase()}
          </div>
        ))}
      </div>
      <div className="flex flex-row w-fit">
        <div className={"w-16 bg-primary " + tailwindClassLetter} onClick={handleDeleteClick}>
          {"◀"}
        </div>
        {zxcvbnm.map((el, index) => (
          <div className={handleColor(el)} key={index} onClick={() => handleLetterClick(el)}>
            {el.toUpperCase()}
          </div>
        ))}
        <div className={"w-16 bg-primary " + tailwindClassLetter} onClick={handleSubmitClick}>
          {"▲"}
        </div>
      </div>
    </div>
  );
}
