import ReactDOM from "react-dom";

const BackDropOverlay = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-20 bg-black opacity-75"></div>
  );
};

const ModalOverlay = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-30 flex justify-center items-center">
      <div className="bg-white rounded-lg  shadow-lg text-slate-700 w-full lg:w-1/2 h-3/4 overflow-y-auto relative">
        {children}
      </div>
    </div>
  );
};

const portalElement = document.getElementById("modal");

const Modal = ({ children }) => {
  return (
    <>
      {ReactDOM.createPortal(<BackDropOverlay />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children} </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
