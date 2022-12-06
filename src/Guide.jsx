import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function GuidePortal(props) {
  const bg = useRef();

  const tailwindClassLetter =
    "flex items-center justify-center border-2 border-secondary border-solid w-10 mx-1 my-1 h-16 cursor-pointer text-white text-3xl";

  const apple = ["A", "P", "P", "L", "E"];
  const horse = ["H", "O", "R", "S", "E"];

  function handleCloseClick() {
    // e.preventDefault();
    props.setShow(false);
  }

  useEffect(() => {
    bg.current.addEventListener("mousedown", () => {
      handleCloseClick();
    });
  }, []);

  const modalContent = props.show ? (
    <div
      ref={bg}
      className="absolute top-0 left-0 w-full h-full flex items-center bg-black/50 z-10 flex-col py-32">
      <h3 className="text-white text-7xl mb-10 font-black">GUIDE</h3>
      <div className="flex flex-row my-5">
        {apple.map((el, index) => {
          return (
            <div
              key={index}
              className={
                index % 2 == 0
                  ? tailwindClassLetter + " bg-secondary"
                  : tailwindClassLetter + " bg-almost border-almost"
              }>
              {el}
            </div>
          );
        })}
      </div>
      <div className="w-1/2 text-center">
        <p className="text-white">
          Yellow background means that this letter is in the word, but it stands in the wrong place.
        </p>
      </div>
      <div className="flex flex-row my-5">
        {horse.map((el, index) => {
          return (
            <div
              key={index}
              className={
                index === 2
                  ? tailwindClassLetter + " bg-secondary"
                  : tailwindClassLetter + " bg-correct border-correct"
              }>
              {el}
            </div>
          );
        })}
      </div>
      <div className="w-1/2 text-center">
        <p className="text-white">
          Green background means that this letter is correct and it stands on its place.
        </p>
      </div>
      <div className="w-1/2 text-center mt-5">
        <p className="text-white">
          Use your keyboard OR letter buttons at the botton to type. Press ENTER to submit your
          word. It will shake if it is inappropriate.
        </p>
      </div>
      <h3 className="text-white font-black text-3xl mt-10">TAP ANYWHERE TO PLAY</h3>
    </div>
  ) : null;

  return ReactDOM.createPortal(modalContent, document.getElementById("root"));
}

export default GuidePortal;
