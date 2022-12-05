import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function GuidePortal(props) {
  const bg = useRef();

  function handleCloseClick() {
    // e.preventDefault();
    props.setShow(false);
    document.getElementById("row0").focus();
  }

  useEffect(() => {
    bg.current.addEventListener("mousedown", () => {
      handleCloseClick();
    });
  }, []);

  const modalContent = props.show ? (
    <div
      ref={bg}
      className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-10">
      <div className="bg-white p-3 rounded-md border-secondary border-2 w-96 h-96 z-20 flex flex-col items-center text-3xl">
        <h1 className="text-primary text-4xl mb-3">GUIDE</h1>
        <div className="flex flex-row w-full h-fit items-center justify-items-start">
          <div className="w-10 h-16 bg-secondary flex items-center justify-center text-white">
            M
          </div>
          <h2 className="text-primary ml-3"> - not in the word </h2>
        </div>
        <div className="flex flex-row w-full h-fit items-center justify-items-start my-3">
          <div className="w-10 h-16 bg-almost flex items-center justify-center text-white ">C</div>
          <h2 className="text-primary ml-3"> - try another spot </h2>
        </div>
        <div className="flex flex-row w-full h-fit items-center justify-items-start">
          <div className="w-10 h-16 bg-correct flex items-center justify-center text-white">S</div>
          <h2 className="text-primary ml-3"> - letter is correct </h2>
        </div>
        <h1 className="text-primary text-3xl mt-3 text-center">TAP ANYWHERE TO PLAY</h1>
      </div>
    </div>
  ) : null;

  return ReactDOM.createPortal(modalContent, document.getElementById("root"));
}

export default GuidePortal;
