import React from "react";
import { FaUser } from "react-icons/fa6";

const MessageBody = () => {
  return (
    <div className="bg-white min-h-screen w-full p-2">
      <div className="bg-white rounded-lg p-6 w-full h-full overflow-auto">
        <h1 className="text-lg font-semibold mb-4 border-b-2 border-gray-200 leading-10">
          Investment Interest
        </h1>
        <div className="border-b-2 border-gray-200 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex justify-center items-center ">
              <FaUser className="h-12 text-white" />
            </div>
            <div className="ml-4">
              <p className="font-semibold">Daisi Meshach</p>
              <p className="text-gray-500 ">meshach@greenstone.africa</p>
            </div>
          </div>
        </div>
        <div className="text-gray-700 space-y-4 mt-2">
          <p>Meshach Daisi has expressed interest in investing in a project</p>
          <p className="font-semibold">Project Details</p>
          <p>Project ID: G0001</p>
          <p>ProjectName - Light up Nigeria</p>
          <p>Investment Amount: 200,000,000.00 Naira</p>
          <p>Investment Type: Equity </p>
          <p>
            {" "}
            Additional Notes from Investor: vestibulum ac. Diam lectus ipsum
            blandit justo sed. Lorem ipsum dolor sit amet consectetur. Arcu
            vestibulum tortor et tempor vestibulum ac. Diam lectus ipsum blandit
            justo sed. Lorem ipsum dolor sit amet consectetur. Arcu vestibulum
            tortor et tempor vestibulum ac. Diam lectus ipsum blandit justo sed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBody;
