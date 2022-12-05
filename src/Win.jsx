import ReactDOM from "react-dom";

function WinPortal(props) {
  function handleCloseClick() {
    // e.preventDefault();
    props.setShow(false);
  }

  const modalContent = props.show ? (
    <div
      className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-10"
      onClick={handleCloseClick}>
      <div className="bg-white p-6 rounded-md border-secondary border-2  z-20 flex flex-col items-center text-3xl">
        <h1 className="text-primary text-7xl mb-3">YOU WON!!!</h1>
      </div>
    </div>
  ) : null;

  return ReactDOM.createPortal(modalContent, document.getElementById("root"));
}

export default WinPortal;
