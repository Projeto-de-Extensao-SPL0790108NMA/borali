import Image from "next/image";

interface ImageUploadProps {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  id?: string;
}

export function ImageUpload({
  imagePreview,
  onImageChange,
  label = "Arte do Evento",
  id = "image",
}: ImageUploadProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem] font-poppins"
      >
        {label}
      </label>
      <div className="relative w-full h-[8rem] md:h-[10.25rem] rounded-[1.125rem] overflow-hidden bg-gray-50 border-2 border-dashed border-gray-300 cursor-pointer group hover:border-primary-blue-dark transition-colors">
        {imagePreview ? (
          <>
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="object-cover"
            />
            <label
              htmlFor={id}
              className="absolute inset-0 cursor-pointer"
            />
          </>
        ) : (
          <label
            htmlFor={id}
            className="flex items-center justify-center h-full cursor-pointer"
          >
            <span className="text-[0.875rem] text-gray-500 group-hover:text-primary-blue-dark transition-colors font-poppins">
              Clique para fazer upload da imagem
            </span>
          </label>
        )}
        <input
          type="file"
          id={id}
          name={id}
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

