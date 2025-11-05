"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { InputForm } from "@/components/form/input-form";
import { TextareaForm } from "@/components/form/textarea-form";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/company/page-header";
import { GradientBanner } from "@/components/company/gradient-banner";
import { ImageUpload } from "@/components/company/image-upload";
import { CreateEventFormData, createEventSchema } from "./schema";

export default function CreateEventPage() {
  const [imagePreview, setImagePreview] = useState("");

  const { control, handleSubmit, setValue } = useForm<CreateEventFormData>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      address: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: CreateEventFormData) => {
    // Implementar lógica de criação de evento aqui
    console.log("Form data:", data);
  };

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-[2.5rem]">
        <PageHeader />
        <GradientBanner />

        <div className="px-[2.5rem]">
          {/* Title */}
          <h2 className="text-[1.5rem] leading-[2.25rem] font-medium text-black mb-[2.5rem] font-poppins">
            Criar Evento
          </h2>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-[2.5rem]"
          >
            {/* Left Column */}
            <div className="flex flex-col gap-[1rem]">
              {/* Título */}
              <div className="font-dm-sans">
                <InputForm
                  name="title"
                  label="Titulo"
                  control={control}
                  isRequired
                  placeholder="Apresentação musical Girls World Tour San Francisco"
                  className="[&_input]:h-[3.25rem] [&_input]:rounded-[0.5rem] [&_input]:bg-input-bg [&_input]:px-[1.25rem] [&_input]:text-[1rem] [&_input]:leading-[1.5rem] [&_input]:font-bold [&_input]:text-black [&_input]:placeholder:text-black [&_input]:border-0 [&_input]:focus:ring-2 [&_input]:focus:ring-primary-blue-dark"
                  labelClassName="text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem]"
                />
              </div>

              {/* Descrição */}
              <div className="font-dm-sans">
                <TextareaForm
                  name="description"
                  label="Descrição"
                  control={control}
                  isRequired
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  rows={3}
                  className="[&_textarea]:min-h-[3.25rem] [&_textarea]:rounded-[0.5rem] [&_textarea]:bg-input-bg [&_textarea]:px-[1.25rem] [&_textarea]:py-[0.875rem] [&_textarea]:text-[0.875rem] [&_textarea]:leading-[1.3125rem] [&_textarea]:font-normal [&_textarea]:text-[#6a6a6a] [&_textarea]:placeholder:text-[#6a6a6a] [&_textarea]:border-0 [&_textarea]:focus:ring-2 [&_textarea]:focus:ring-primary-blue-dark"
                  labelClassName="text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem]"
                />
              </div>

              {/* Data */}
              <InputForm
                name="date"
                label="data"
                control={control}
                type="date"
                isRequired
                className="[&_input]:h-[3.25rem] [&_input]:rounded-[0.5rem] [&_input]:bg-input-bg [&_input]:px-[1.25rem] [&_input]:text-[1rem] [&_input]:leading-[1.5rem] [&_input]:font-normal [&_input]:text-black [&_input]:border-0 [&_input]:focus:ring-2 [&_input]:focus:ring-primary-blue-dark"
                labelClassName="text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem]"
              />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-[1rem]">
              {/* Endereço */}
              <div className="font-gabarito">
                <InputForm
                  name="address"
                  label="Endereço"
                  control={control}
                  isRequired
                  placeholder="Bemol Torquato Tapajós, Av. Torquato Tapajós,"
                  className="[&_input]:h-[3.25rem] [&_input]:rounded-[0.5rem] [&_input]:bg-input-bg [&_input]:px-[1.25rem] [&_input]:text-[1rem] [&_input]:leading-[1.75rem] [&_input]:font-normal [&_input]:text-text-secondary [&_input]:placeholder:text-text-secondary [&_input]:border-0 [&_input]:focus:ring-2 [&_input]:focus:ring-primary-blue-dark"
                  labelClassName="text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem]"
                />
              </div>

              {/* Arte do Evento */}
              <ImageUpload
                imagePreview={imagePreview}
                onImageChange={handleImageChange}
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-2 flex justify-center mt-[2rem]">
              <Button
                type="submit"
                variant="companyPrimary"
                size="companyLg"
                className="font-gabarito"
              >
                Criar Evento
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
