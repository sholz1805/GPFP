import axios from 'axios';

const CLOUDINARY_BASE_URL = 'https://api.cloudinary.com/v1_1/dznfp924n';
const UPLOAD_PRESET = 'gpfp_uploads';

const CloudinaryUpload = async (file, folder) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', folder);

  const fileType = file.type.split('/')[0]; 
  let resourceType;

  if (fileType === 'image') {
    resourceType = 'image';
  } else if (fileType === 'video') {
    resourceType = 'video';
  } else {
    resourceType = 'raw';
  }

  const CLOUDINARY_URL = `${CLOUDINARY_BASE_URL}/${resourceType}/upload`;

  try {
    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary', error);
    throw error;
  }
};

export default CloudinaryUpload;