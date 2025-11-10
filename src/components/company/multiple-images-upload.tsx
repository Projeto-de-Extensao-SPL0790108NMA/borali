"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface MultipleImagesUploadProps {
  images: File[];
  imagePreviews: string[];
  onImagesChange: (files: File[]) => void;
  onRemovePreview?: (index: number) => void;
  label?: string;
  id?: string;
}

export function MultipleImagesUpload({
  images,
  imagePreviews,
  onImagesChange,
  onRemovePreview,
  label = "Imagens do Evento",
  id = "images",
}: MultipleImagesUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newImages = [...images, ...files];
      onImagesChange(newImages);
    }
    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    if (onRemovePreview) {
      onRemovePreview(index);
    } else {
      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);
    }
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem] font-poppins"
      >
        {label}
      </label>

      {imagePreviews.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          {imagePreviews.map((preview, index) => (
            <div
              key={index}
              className="relative w-full h-[10.25rem] rounded-[1.125rem] overflow-hidden bg-gray-50 border-2 border-gray-300"
            >
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                aria-label="Remover imagem"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="relative w-full h-[10.25rem] rounded-[1.125rem] overflow-hidden bg-gray-50 border-2 border-dashed border-gray-300 cursor-pointer group hover:border-primary-blue-dark transition-colors">
        <label
          htmlFor={id}
          className="flex items-center justify-center h-full cursor-pointer"
        >
          <span className="text-[0.875rem] text-gray-500 group-hover:text-primary-blue-dark transition-colors font-poppins">
            {imagePreviews.length > 0
              ? "Clique para adicionar mais imagens"
              : "Clique para fazer upload das imagens"}
          </span>
        </label>
        <input
          type="file"
          id={id}
          name={id}
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
