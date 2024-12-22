import { Loader } from "lucide-react";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ImageUpload({ onImagesChange, images = [] }) {
  const [previewUrls, setPreviewUrls] = useState(images);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const uploadPromises = files.map(async (file) => {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL_DEV}/api/cloudinary`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          toast.success("image uploaded");
          setIsUploading(false);
          return data.secure_url; // Assuming the API returns the uploaded image URL
        }

        throw new Error("Upload failed");
      } catch (error) {
        toast.error("image Upload failed");
        console.error("Upload error:", error);
        return null;
      }
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    const validUrls = uploadedUrls.filter((url) => url !== null);

    setUploadedImages((prev) => [...prev, ...validUrls]);
    onImagesChange([...previewUrls, ...validUrls]);
    setPreviewUrls((prev) => [...prev, ...validUrls]);
  };

  const removeImage = (index) => {
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    onImagesChange(uploadedImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
        accept="image/*"
      />
      <label
        htmlFor="image-upload"
        className="inline-flex justify-center gap-4 items-center h-24 text-xl w-full text-center py-2 px-4 border border-dashed border-gray-300 rounded-md shadow-sm font-medium text-gray-700 dark:text-gray-400 bg-white dark:bg-inherit hover:bg-gray-50 cursor-pointer"
      >
        {isUploading ? (
          <>
            <Loader className="animate-spin" /> Uploading...
          </>
        ) : (
          <>
            <UploadCloud /> Upload Images
          </>
        )}
      </label>

      <div className="mt-4 grid grid-cols-4 gap-4">
        {previewUrls.map((url, index) => (
          <div key={index} className="relative group">
            <Image
              key={index}
              width={200}
              height={200}
              src={url}
              alt={`Preview ${index + 1}`}
              className="w-full h-32 object-contain ring-1 rounded-md"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
