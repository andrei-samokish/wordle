import { useContext } from "react";
import { Context } from "./Context";

export default function Letters() {
  const qwertyuiop = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const asdfghjkl = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const zxcvbnm = ["z", "x", "c", "v", "b", "n", "m"];

  const { isInWord } = useContext(Context);

  const tailwindClassLetter =
    "flex items-center justify-center border-2 border-secondary border-solid w-10 mx-1 my-1 h-16";

  function handleColor(el) {
    return isInWord[el].length
      ? isInWord[el][0]
        ? "bg-correct border-correct " + tailwindClassLetter
        : isInWord[el][1]
        ? "bg-almost border-almost " + tailwindClassLetter
        : "bg-secondary " + tailwindClassLetter
      : "bg-primary " + tailwindClassLetter;
  }

  return (
    <div className="flex flex-col items-center my-10 text-white font-bold text-3xl">
      <div className="flex flex-row w-fit">
        {qwertyuiop.map((el, index) => (
          <div className={handleColor(el)} key={index}>
            {el.toUpperCase()}
          </div>
        ))}
      </div>
      <div className="flex flex-row w-fit">
        {asdfghjkl.map((el, index) => (
          <div className={handleColor(el)} key={index}>
            {el.toUpperCase()}
          </div>
        ))}
      </div>
      <div className="flex flex-row w-fit">
        {zxcvbnm.map((el, index) => (
          <div className={handleColor(el)} key={index}>
            {el.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}
