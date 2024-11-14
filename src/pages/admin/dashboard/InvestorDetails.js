import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchInvestorProfile } from "../../../redux/actions/profileActions";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaUser  } from "react-icons/fa";

const InvestorDetails = () => {
  const { userId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchInvestorProfile(userId));
  }, [dispatch, userId]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="h-screen bg-[#eeeeee] flex justify-center items-center relative">
        <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 rounded-full w-32 h-32 flex items-center justify-center mb-4">
              {profile ? (
                <img
                  src={profile?.profile?.data?.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <FaUser  />
              )}
            </div>
            <h1 className="text-xl font-semibold mb-4">
              {profile?.profile?.data?.username}
            </h1>
          </div>
          <hr className="my-4" />
          <div>
            <h2 className="text-sm font-semibold">Expectation</h2>
            <p className="text-gray-600 mb-4">
              {profile?.profile?.data?.expectation}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold">User Id</h3>
                <p className="text-gray-600">
                {profile?.profile?.data?.uniqueId}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Phone No</h3>
                <p className="text-gray-600">
                  {profile?.profile?.data?.phoneNumber}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Email</h3>
                <p className="text-gray-600">{profile?.profile?.data?.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Investment Experience</h3>
                <p className="text-gray-600">
                  {profile?.profile?.data?.investmentExperience} Years
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Total Amount Invested</h3>
                <p className="text-gray-600 font-bold">
                    #{profile?.profile?.data?.companyWebsite || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Floating button */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={handleBack}
            className="flex items-center bg-primary text-white text-sm rounded-md px-4 py-2 hover:bg-secondary"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default InvestorDetails;