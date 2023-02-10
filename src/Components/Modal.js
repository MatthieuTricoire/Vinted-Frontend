import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
const Modal = ({ setModalVisible, modalVisible, initializeModal }) => {
  return (
    <div
      onClick={() => {
        setModalVisible(!modalVisible);
      }}
      className="modal"
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="modal__container column"
      >
        <button
          onClick={() => {
            setModalVisible(!modalVisible);
          }}
          className="modal__container__btn"
        >
          X
        </button>
        {initializeModal === "SignIn" ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};

export default Modal;
