import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
const Modal = ({ handleToken, setModalVisible, modalVisible, initializeModal, setInitializeModal }) => {
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
          className="btn btn--dark modal__container__btn"
        >
          X
        </button>
        {initializeModal === "SignIn" ? <SignIn handleToken={handleToken} modalVisible={modalVisible} setModalVisible={setModalVisible} initializeModal={initializeModal} setInitializeModal={setInitializeModal} /> :
          <SignUp handleToken={handleToken} modalVisible={modalVisible} setModalVisible={setModalVisible} initializeModal={initializeModal} setInitializeModal={setInitializeModal} />}
      </div>
    </div>
  );
};

export default Modal;
