import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import CloudinaryUpload from '../../../redux/CloudinaryUpload';

const ReportModal = ({ isOpen, onClose, onSubmit, userUniqueId, projectUniqueId }) => {
    const [reportLink, setReportLink] = useState('');
    const [reportMonth, setReportMonth] = useState('');
    const [reportYear, setReportYear] = useState(new Date().getFullYear());
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');
    const [showStatus, setShowStatus] = useState(false);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log(file)
        if (selectedFile) {
            setIsLoading(true);
            setUploadStatus('');
            try {
                const uploadedLink = await CloudinaryUpload(selectedFile, 'reports');
                setReportLink(uploadedLink);
                setUploadStatus('success');
            } catch (error) {
                console.error('File upload failed:', error);
                setUploadStatus('fail');
            } finally {
                setIsLoading(false);
                setShowStatus(true);
                setTimeout(() => setShowStatus(false), 3000);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const reportData = {
            projectUniqueId,
            userUniqueId,
            reportLink,
            reportMonth,
            reportYear,
        };

        onSubmit(reportData);
        resetFields();
    };

    const resetFields = () => {
        setReportLink('');
        setReportMonth('');
        setReportYear(new Date().getFullYear());
        setFile(null);
        setUploadStatus('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-72 p-6 rounded shadow-md relative">
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-1 py-1 bg-gray-300 text-xs text-gray-700 rounded-full hover:bg-gray-400"
                    >
                        <IoIosClose />
                    </button>
                </div>
                <h2 className="text-sm font-semibold text-primary mb-2">
                    Add Project Report
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-xs font-medium">Project Id</label>
                        <input
                            type="text"
                            value={projectUniqueId}
                            className="border border-gray-300 outline-none rounded-md p-2 w-full text-xs"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-xs font-medium">User  Id</label>
                        <input
                            type="text"
                            value={userUniqueId}
                            className="border border-gray-300 outline-none rounded-md p-2 w-full text-xs"
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-xs font-medium">Upload Report File</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                            file:text-sm file:font-semibold file:bg-green-50 cursor-pointer mb-4 file:text-primary hover:file:bg-secondary-100"
                            required
                        />
                    </div>
                    {isLoading && (
                        <p className="text-sm text-blue-500 mb-4">Uploading...</p>
                    )}
                    {showStatus && (
                        <p
                            className={`text-sm ${
                                uploadStatus === "success" ? "text-green-500" : "text-red-500"
                            } mb-4`}
                        >
                            {uploadStatus === "success"
                                ? "Upload successful!"
                                : "Upload failed. Please try again."}
                        </p>
                    )}
                    <div className="mb-4">
                        < label className="block text-xs font-medium">Report Month</label>
                        <select
                            value={reportMonth}
                            onChange={(e) => setReportMonth(e.target.value)}
                            className="border border-gray-300 outline-none rounded-md p-2 w-full text-xs"
                            required
                        >
                            <option value="">Select Month</option>
                            {Array.from({ length: 12 }, (_, index) => (
                                <option key={index} value={index + 1}>
                                    {new Date(0, index).toLocaleString('default', { month: 'long' })}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-xs font-medium">Report Year</label>
                        <input
                            type="number"
                            value={reportYear}
                            onChange={(e) => setReportYear(Number(e.target.value))}
                            className="border border-gray-300 outline-none rounded-md p-2 w-full text-xs"
                            required
                        />
                    </div>
                   
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-primary text-white text-xs rounded-md px-4 py-2"
                        >
                            Create Report
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportModal;