import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDeveloperProfile } from "../../../redux/actions/profileActions";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaUser  } from "react-icons/fa";

const DeveloperDetails = () => {
  const { userId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchDeveloperProfile(userId));
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
                  src={profile?.profile?.data?.developerProfilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <FaUser  />
              )}
            </div>
            <h1 className="text-xl font-semibold mb-4">
              {profile?.profile?.data?.companyName}
            </h1>
          </div>
          <hr className="my-4" />
          <div>
            <h2 className="text-sm font-semibold">User Id</h2>
            <p className="text-gray-600 mb-4">
              {profile?.profile?.data?.uniqueId}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold">Address</h3>
                <p className="text-gray-600">
                  {profile?.profile?.data?.companyAddress}
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
                <h3 className="text-sm font-semibold">Years of Operation</h3>
                <p className="text-gray-600">
                  {profile?.profile?.data?.operationYears} Years
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Website</h3>
                <p className="text-gray-600">
                  <a
                    href={profile?.profile?.data?.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile?.profile?.data?.companyWebsite}
                  </a>
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

export default DeveloperDetails;