const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const unsignedUploadPreset = process.env.CLOUDINARY_PRESET;

type photoType = {
  uri: string;
  type: string;
  name: string;
};

const cloudinaryUpload = async (photo: photoType) => {
  console.log('reached upload', photo);
  const data = new FormData();
  data.append('file', photo);
  data.append('upload_preset', unsignedUploadPreset);
  data.append('cloud_name', cloudName);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: 'post',
        body: data,
      },
    );
    const responseData = await response.json();
    return responseData.secure_url;
  } catch (err) {
    console.log('An Error Occurred While Uploading', err);
  }
};

export default cloudinaryUpload;
