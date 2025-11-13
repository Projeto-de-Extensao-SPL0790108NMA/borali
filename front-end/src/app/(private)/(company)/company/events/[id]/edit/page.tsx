"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { InputForm } from "@/components/form/input-form";
import { TextareaForm } from "@/components/form/textarea-form";
import { Button } from "@/components/ui/button";

import { GradientBanner } from "@/components/ui/gradient-banner";
import { ImageUpload } from "@/components/company/image-upload";
import { MultipleImagesUpload } from "@/components/company/multiple-images-upload";
import { EditEventSkeleton } from "@/components/company/edit-event-skeleton";
import { useGetEventById } from "@/domain/event/useCases/use-get-event-by-id";
import { useUpdateEvent } from "@/domain/event/useCases/use-update-event";
import { geocodeAddress } from "@/domain/geocoding/geocoding-api";
import { useDebounce } from "@/hooks/use-debounce";
import { EditEventFormData, editEventSchema } from "./schema";
import { PageHeader } from "@/components/ui/page-header";

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [imagePreview, setImagePreview] = useState("");
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [originalAddress, setOriginalAddress] = useState<string>("");

  const { data: eventData, isLoading, error } = useGetEventById(eventId);
  const { mutate: updateEvent, isPending } = useUpdateEvent(eventId);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    setError,
    clearErrors,
  } = useForm<EditEventFormData>({
    resolver: zodResolver(editEventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
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
    if (eventData) {
      const eventDate = new Date(eventData.date).toISOString().split("T")[0];

      // Armazenar o endereço original
      setOriginalAddress(eventData.address);

      // Preencher o formulário com os dados, incluindo as coordenadas que já vêm da API
      reset({
        title: eventData.title,
        description: eventData.description,
        date: eventDate,
        address: eventData.address,
        latitude: eventData.latitude?.toString() || "",
        longitude: eventData.longitude?.toString() || "",
      });

      // Set cover image preview (first image or placeholder)
      const firstImage = eventData.images?.[0];
      if (firstImage?.url) {
        setImagePreview(firstImage.url);
      } else {
        setImagePreview("/placeholder.png");
      }

      const otherImages = eventData.images?.slice(1) || [];
      if (otherImages.length > 0) {
        const imageUrls = otherImages.map((img) => img.url);
        setImagePreviews(imageUrls);
        setExistingImageUrls(imageUrls);
      } else {
        setImagePreviews([]);
        setExistingImageUrls([]);
      }

      setNewImages([]);
    }
  }, [eventData, reset]);

  useEffect(() => {
    // Só fazer geocodificação se o endereço foi alterado em relação ao original
    if (
      addressValue &&
      addressValue.trim() !== "" &&
      originalAddress &&
      eventData
    ) {
      // Se o endereço mudou em relação ao original, fazer geocodificação
      if (addressValue !== originalAddress) {
        debouncedGeocode(addressValue);
      } else {
        // Se o endereço voltou ao original, restaurar as coordenadas originais
        setValue("latitude", eventData.latitude?.toString() || "", {
          shouldValidate: true,
        });
        setValue("longitude", eventData.longitude?.toString() || "", {
          shouldValidate: true,
        });
        clearErrors("address");
        clearErrors("latitude");
        clearErrors("longitude");
      }
    } else if (addressValue && addressValue.trim() !== "" && !originalAddress) {
      // Se ainda não temos o endereço original (dados ainda não carregaram), fazer geocodificação
      debouncedGeocode(addressValue);
    } else if (!addressValue || addressValue.trim() === "") {
      setValue("latitude", "");
      setValue("longitude", "");
      clearErrors("address");
      clearErrors("latitude");
      clearErrors("longitude");
    }
  }, [
    addressValue,
    debouncedGeocode,
    setValue,
    clearErrors,
    originalAddress,
    eventData,
  ]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        if (preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreviews, imagePreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImagesChange = (files: File[]) => {
    imagePreviews.forEach((preview) => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    });

    setNewImages(files);
    setValue("images", files);

    const newFilePreviews = files.map((file) => URL.createObjectURL(file));

    const allPreviews = [...existingImageUrls, ...newFilePreviews];
    setImagePreviews(allPreviews);
  };

  const handleRemovePreview = (index: number) => {
    const previewToRemove = imagePreviews[index];

    if (index < existingImageUrls.length) {
      const newExistingUrls = existingImageUrls.filter((_, i) => i !== index);
      setExistingImageUrls(newExistingUrls);
    } else {
      const blobIndex = index - existingImageUrls.length;
      const newFiles = newImages.filter((_, i) => i !== blobIndex);
      setNewImages(newFiles);
      setValue("images", newFiles);

      if (previewToRemove.startsWith("blob:")) {
        URL.revokeObjectURL(previewToRemove);
      }
    }

    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
  };

  const onSubmit = async (data: EditEventFormData) => {
    if (!data.latitude || !data.longitude) {
      setError("address", {
        type: "manual",
        message:
          "Por favor, informe um endereço válido que possa ser geocodificado.",
      });
      return;
    }

    const latitude = parseFloat(data.latitude);
    const longitude = parseFloat(data.longitude);

    const dateTime = new Date(data.date);
    const timezoneOffset = -dateTime.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60)
      .toString()
      .padStart(2, "0");
    const offsetMinutes = (Math.abs(timezoneOffset) % 60)
      .toString()
      .padStart(2, "0");
    const offsetSign = timezoneOffset >= 0 ? "+" : "-";
    const timezoneString = `${offsetSign}${offsetHours}:${offsetMinutes}`;

    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    const day = dateTime.getDate().toString().padStart(2, "0");
    const hours = dateTime.getHours().toString().padStart(2, "0");
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    const seconds = dateTime.getSeconds().toString().padStart(2, "0");

    const isoDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneString}`;

    updateEvent({
      title: data.title,
      description: data.description,
      address: data.address,
      latitude,
      longitude,
      date: isoDate,
      image: data.image instanceof File ? data.image : undefined,
      images: data.images && data.images.length > 0 ? data.images : undefined,
    });
  };

  if (isLoading) {
    return <EditEventSkeleton />;
  }

  if (error || !eventData) {
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
      <div className="p-4 md:p-[2.5rem]">
        <PageHeader />
        <GradientBanner />

        <div className="px-0 md:px-[2.5rem]">
          <h2 className="text-xl md:text-[1.5rem] leading-[1.875rem] md:leading-[2.25rem] font-medium text-black mb-6 md:mb-[2.5rem] font-poppins">
            Editar Evento
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[2.5rem]"
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
                label="data"
                control={control}
                type="date"
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
                    Buscando endereço...
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
                label="Imagem de Capa do Evento"
              />

              <MultipleImagesUpload
                images={newImages}
                imagePreviews={imagePreviews}
                onImagesChange={handleImagesChange}
                onRemovePreview={handleRemovePreview}
                label="Imagens do Evento"
              />
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-center mt-4 md:mt-[2rem]">
              <Button
                type="submit"
                variant="companyPrimary"
                size="companyLg"
                className="font-gabarito w-full md:w-auto"
                disabled={isPending}
              >
                {isPending ? "Atualizando..." : "Atualizar"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
