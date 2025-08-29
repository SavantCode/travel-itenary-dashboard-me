// src/utils/cloudinary.ts

// CHANGE: Use `import.meta.env` for Vite, the modern standard for React apps.
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Ensure your .env file has the correct variables
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
  throw new Error(
    'Cloudinary environment variables are missing. Ensure VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET are in your .env file.'
  );
}

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// Allowed image mime types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];

// Max file size 2MB = 2 * 1024 * 1024 bytes
const MAX_FILE_SIZE = 2 * 1024 * 1024;

/**
 * Uploads an image file to Cloudinary using an unsigned upload preset.
 * It validates file type and size before uploading.
 * @param file - The image file to upload.
 * @returns Promise resolving to the secure URL of the uploaded image or null on failure.
 */
export const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
  // Check file type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    alert('Invalid file type. Please upload an image in JPEG, PNG, GIF, WEBP, or BMP format.');
    return null;
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    alert('File size exceeds 2MB. Please upload a smaller image.');
    return null;
  }

  const formData = new FormData();
  formData.append('file', file);
  // CHANGE: Use the variable which is now correctly sourced.
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary upload failed:', errorData);
      throw new Error('Cloudinary upload failed.');
    }

    const data = await response.json();
    return data.secure_url as string;

  } catch (error) {
    console.error('Error uploading image:', error);
    alert('There was an error uploading the image. Please try again.');
    return null;
  }
};