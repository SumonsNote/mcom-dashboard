import { XIcon } from "lucide-react";
import { CSSTransition } from "react-transition-group";

const Modal = ({ children, isOpen, onClose }) => {
  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames={{
        enter: "ease-out duration-300",
        enterActive: "opacity-100",
        exit: "ease-in duration-200",
        exitActive: "opacity-0",
      }}
      unmountOnExit
    >
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4 overflow-y-auto bg-black bg-opacity-25 dark:bg-opacity-50">
        <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative dark:bg-gray-800 dark:text-gray-300">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none dark:text-gray-300 dark:hover:text-white"
            onClick={onClose}
          >
            <XIcon className="w-6 h-6" />
          </button>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
