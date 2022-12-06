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
      <div className="p-6 rounded-md z-20 flex flex-col items-center text-3xl">
        <h3 className="text-white text-7xl mb-3 font-black">YOU WON</h3>
        <h4 className="text-white font-black">attempts: {props.attempt}</h4>
      </div>
    </div>
  ) : null;

  return ReactDOM.createPortal(modalContent, document.getElementById("root"));
}

export default WinPortal;
