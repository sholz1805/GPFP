import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dznfp924n/image/upload';
const UPLOAD_PRESET = 'gpfp_uploads';

const CloudinaryUpload = async (file, folder) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', folder);

  try {
    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading to Cloudinary', error);
    throw error;
  }
};

export default CloudinaryUpload;
