"use client";

import { useState, useEffect, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { InputForm } from "@/components/form/input-form";
import { TextareaForm } from "@/components/form/textarea-form";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { GradientBanner } from "@/components/ui/gradient-banner";
import { ImageUpload } from "@/components/company/image-upload";
import { useGetUserMe } from "@/domain/user/useCases/use-get-user-me";
import { useCreateEvent } from "@/domain/event/useCases/use-create-event";
import { geocodeAddress } from "@/domain/geocoding/geocoding-api";
import { useDebounce } from "@/hooks/use-debounce";
import { CreateEventFormData, createEventSchema } from "./schema";

export default function CreateEventPage() {
  const [imagePreview, setImagePreview] = useState("");
  const [isGeocoding, setIsGeocoding] = useState(false);

  const { data: userData } = useGetUserMe();
  const { mutate: createEvent, isPending } = useCreateEvent();

  const { control, handleSubmit, setValue, watch, setError, clearErrors } =
    useForm<CreateEventFormData>({
      resolver: zodResolver(createEventSchema),
      defaultValues: {
        title: "",
        description: "",
        date: "",
        time: "",
        address: "",
        latitude: "",
        longitude: "",
      },
    });

  const addressValue = watch("address");

  const performGeocode = useCallback(
    async (address: string) => {
      if (!address || address.trim() === "") {
        setValue("latitude", "");
        setValue("longitude", "");
        clearErrors("address");
        clearErrors("latitude");
        clearErrors("longitude");
        return;
      }

      setIsGeocoding(true);
      clearErrors("address");

      const coordinates = await geocodeAddress(address);

      if (coordinates) {
        setValue("latitude", coordinates.latitude.toString(), {
          shouldValidate: true,
        });
        setValue("longitude", coordinates.longitude.toString(), {
          shouldValidate: true,
        });
        clearErrors("address");
        clearErrors("latitude");
        clearErrors("longitude");
      } else {
        setValue("latitude", "");
        setValue("longitude", "");
        setError("address", {
          type: "manual",
          message:
            "Não foi possível encontrar as coordenadas para este endereço. Por favor, verifique se o endereço está correto e tente novamente.",
        });
        setError("latitude", {
          type: "manual",
          message: "Coordenadas não encontradas para este endereço",
        });
        setError("longitude", {
          type: "manual",
          message: "Coordenadas não encontradas para este endereço",
        });
      }

      setIsGeocoding(false);
    },
    [setValue, setError, clearErrors]
  );

  const debouncedGeocode = useDebounce(performGeocode, 1000);

  useEffect(() => {
    if (addressValue && addressValue.trim() !== "") {
      debouncedGeocode(addressValue);
    } else {
      setValue("latitude", "");
      setValue("longitude", "");
      clearErrors("address");
      clearErrors("latitude");
      clearErrors("longitude");
    }
  }, [addressValue, debouncedGeocode, setValue, clearErrors]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: CreateEventFormData) => {
    if (!userData?.company?.id) {
      return;
    }

    if (!data.latitude || !data.longitude) {
      setError("address", {
        type: "manual",
        message:
          "Por favor, informe um endereço válido que possa ser geocodificado.",
      });
      return;
    }

    const dateTime = new Date(`${data.date}T${data.time}`);
    const isoDate = dateTime.toISOString();

    const latitude = parseFloat(data.latitude);
    const longitude = parseFloat(data.longitude);

    createEvent({
      title: data.title,
      description: data.description,
      address: data.address,
      latitude,
      longitude,
      date: isoDate,
      company_id: userData.company.id,
      image: data.image instanceof File ? data.image : undefined,
    });
  };

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-[2.5rem]">
        <PageHeader />
        <GradientBanner />

        <div className="px-[2.5rem]">
          <h2 className="text-[1.5rem] leading-[2.25rem] font-medium text-black mb-[2.5rem] font-poppins">
            Criar Evento
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-[2.5rem]"
          >
            <div className="flex flex-col gap-[1rem]">
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

              <InputForm
                name="date"
                label="Data"
                control={control}
                type="date"
                isRequired
                className="[&_input]:h-[3.25rem] [&_input]:rounded-[0.5rem] [&_input]:bg-input-bg [&_input]:px-[1.25rem] [&_input]:text-[1rem] [&_input]:leading-[1.5rem] [&_input]:font-normal [&_input]:text-black [&_input]:border-0 [&_input]:focus:ring-2 [&_input]:focus:ring-primary-blue-dark"
                labelClassName="text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem]"
              />

              <InputForm
                name="time"
                label="Hora"
                control={control}
                type="time"
                isRequired
                className="[&_input]:h-[3.25rem] [&_input]:rounded-[0.5rem] [&_input]:bg-input-bg [&_input]:px-[1.25rem] [&_input]:text-[1rem] [&_input]:leading-[1.5rem] [&_input]:font-normal [&_input]:text-black [&_input]:border-0 [&_input]:focus:ring-2 [&_input]:focus:ring-primary-blue-dark"
                labelClassName="text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem]"
              />
            </div>

            <div className="flex flex-col gap-[1rem]">
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
                {isGeocoding && (
                  <p className="text-sm text-gray-500 mt-1">
                    Buscando coordenadas...
                  </p>
                )}
              </div>

              <div className="hidden">
                <InputForm
                  name="latitude"
                  label="Latitude"
                  control={control}
                  type="number"
                  step="any"
                  isRequired
                  placeholder="-3.131930"
                  className="[&_input]:h-[3.25rem] [&_input]:rounded-[0.5rem] [&_input]:bg-input-bg [&_input]:px-[1.25rem] [&_input]:text-[1rem] [&_input]:leading-[1.75rem] [&_input]:font-normal [&_input]:text-text-secondary [&_input]:placeholder:text-text-secondary [&_input]:border-0 [&_input]:focus:ring-2 [&_input]:focus:ring-primary-blue-dark"
                  labelClassName="text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem]"
                />
              </div>

              <div className="hidden">
                <InputForm
                  name="longitude"
                  label="Longitude"
                  control={control}
                  type="number"
                  step="any"
                  isRequired
                  placeholder="-60.023590"
                  className="[&_input]:h-[3.25rem] [&_input]:rounded-[0.5rem] [&_input]:bg-input-bg [&_input]:px-[1.25rem] [&_input]:text-[1rem] [&_input]:leading-[1.75rem] [&_input]:font-normal [&_input]:text-text-secondary [&_input]:placeholder:text-text-secondary [&_input]:border-0 [&_input]:focus:ring-2 [&_input]:focus:ring-primary-blue-dark"
                  labelClassName="text-[1rem] leading-[1.5rem] font-normal text-black mb-[0.75rem]"
                />
              </div>

              <ImageUpload
                imagePreview={imagePreview}
                onImageChange={handleImageChange}
              />
            </div>

            <div className="col-span-2 flex justify-center mt-[2rem]">
              <Button
                type="submit"
                variant="companyPrimary"
                size="companyLg"
                className="font-gabarito"
                disabled={isPending || !userData?.company?.id}
              >
                {isPending ? "Criando..." : "Criar Evento"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
