import { IoClose } from "react-icons/io5";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const MessageModal = ({ message, onClose, isSuccess }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        {isSuccess ? (
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-green-500 mb-2" size={30} />
            <p className="text-center">{message}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <FaTimesCircle className="text-red-500 mb-2"  size={30}/>
            <p className="text-center">{message}</p>
          </div>
        )}
        <IoClose
          className="absolute top-2 right-2 cursor-pointer text-gray-500"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default MessageModal;
