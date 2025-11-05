"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { InputForm } from "@/components/form/input-form";
import { TextareaForm } from "@/components/form/textarea-form";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/company/page-header";
import { GradientBanner } from "@/components/company/gradient-banner";
import { ImageUpload } from "@/components/company/image-upload";
import { Event } from "@/types/company";
import { EditEventFormData, editEventSchema } from "./schema";

// Mock data - substituir por dados reais da API depois
const mockEvents: Record<string, Event> = {
  "1": {
    id: "1",
    title: "Apresentação musical Girls World Tour San Francisco",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2025-09-14",
    address: "Bemol Torquato Tapajós, Av. Torquato Tapajós,",
    image: "/placeholder.png",
  },
  "2": {
    id: "2",
    title: "JYJ 2011 JYJ Worldwide Concert Barcelona",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2025-09-20",
    address: "Bemol Torquato Tapajós, Av. Torquato Tapajós,",
    image: "/placeholder.png",
  },
  "3": {
    id: "3",
    title: "2011 Super Junior SM Town Live '10 World Tour New York City",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2025-09-22",
    address: "Bemol Torquato Tapajós, Av. Torquato Tapajós,",
    image: "/placeholder.png",
  },
  "4": {
    id: "4",
    title: "EXPOAGRO UNIVERSIDADE NILTON LINS",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2025-04-25",
    address: "Bemol Torquato Tapajós, Av. Torquato Tapajós,",
    image: "/placeholder.png",
  },
  "5": {
    id: "5",
    title: "EXPOAGRO 2025",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2025-09-28",
    address: "Bemol Torquato Tapajós, Av. Torquato Tapajós,",
    image: "/placeholder.png",
  },
  "6": {
    id: "6",
    title: "2011 Super Junior SM Town Live '10 World Tour New York City",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2025-10-18",
    address: "Bemol Torquato Tapajós, Av. Torquato Tapajós,",
    image: "/placeholder.png",
  },
};

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { control, handleSubmit, setValue, reset } = useForm<EditEventFormData>(
    {
      resolver: zodResolver(editEventSchema),
      defaultValues: {
        title: "",
        description: "",
        date: "",
        address: "",
      },
    }
  );

  useEffect(() => {
    // Simular carregamento de dados do evento
    const event = mockEvents[eventId];
    if (event) {
      const eventDate =
        typeof event.date === "string"
          ? event.date
          : event.date.toISOString().split("T")[0];

      reset({
        title: event.title,
        description: event.description,
        date: eventDate,
        address: event.address,
      });
      setImagePreview(event.image);
    }
    setIsLoading(false);
  }, [eventId, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: EditEventFormData) => {
    // Implementar lógica de atualização de evento aqui
    console.log("Form data:", data);
    // Após atualizar, redirecionar para a página de eventos
    router.push("/company/events");
  };

  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto bg-white flex items-center justify-center">
        <p className="text-[1rem] text-black font-poppins">Carregando...</p>
      </div>
    );
  }

  const event = mockEvents[eventId];
  if (!event) {
    return (
      <div className="flex-1 overflow-auto bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-[1rem] text-black mb-4 font-poppins">
            Evento não encontrado
          </p>
          <Button
            type="button"
            onClick={() => router.push("/company/events")}
            variant="companyPrimary"
            size="companyDefault"
          >
            Voltar para Eventos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-[2.5rem]">
        <PageHeader />
        <GradientBanner />

        <div className="px-[2.5rem]">
          {/* Title */}
          <h2 className="text-[1.5rem] leading-[2.25rem] font-medium text-black mb-[2.5rem] font-poppins">
            Editar Evento
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
                Atualizar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
