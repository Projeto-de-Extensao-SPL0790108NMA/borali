"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { favoriteEvent, getEventById } from "@/domain/event/event-api";
import { queryKeys } from "@/infra/queryKey/query-key";
import { dateUtils } from "@/helpers/dateUtils";
import { MaterialIcon } from "@/components/ui/material-icon";
import { EventMap } from "@/components/ui/event-map";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { useGetEventComments } from "@/domain/event/useCases/use-get-event-comments";
import { useCreateEventComment } from "@/domain/event/useCases/use-create-event-comment";
import { InputForm } from "@/components/form/input-form";
import { CommentFormData, commentSchema } from "./schema";
import { CommentsSkeleton } from "@/components/ui/comments-skeleton";
import { EventDetailSkeleton } from "@/components/ui/event-detail-skeleton";
import { useState } from "react";


export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;

  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.event.details({ eventId }),
    queryFn: () => getEventById(eventId),
    enabled: !!eventId,
  });

  const { data: commentsData, isLoading: isLoadingComments } =
    useGetEventComments({
      eventId,
      page: 1,
      per_page: 10,
    });

  const { control, handleSubmit, reset } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      description: "",
    },
  });

  const { mutate: createComment, isPending: isCreatingComment } =
    useCreateEventComment(eventId, {
      onSuccess: () => {
        reset();
      },
    });

  const onSubmitComment = (data: CommentFormData) => {
    createComment({
      eventId,
      description: data.description,
    });
  };

  const [isFavorited, setIsFavorited] = useState(false);

  const { mutate: favorite, isPending } = useMutation({
    mutationFn: () => favoriteEvent(eventId),
    onSuccess: () => {
      setIsFavorited(true);
    },
  });

  if (isLoading) {
    return <EventDetailSkeleton />;
  }

  if (error || !event) {
    return (
      <div className="flex-1 overflow-auto bg-white">
        <div className="flex items-center justify-center h-full">
          <p className="text-[1rem] leading-[1.5rem] font-normal text-red-600 font-poppins">
            Erro ao carregar evento. Tente novamente.
          </p>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const formattedDate = dateUtils.formatEventDate(eventDate);
  const formattedTime = dateUtils.formatEventTime(eventDate);
  const dayOfWeek = dateUtils.formatEventDayOfWeek(eventDate);

  const images =
    event.images && event.images.length > 0
      ? event.images
      : [{ id: "placeholder", url: "/placeholder.png" }];

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="w-full max-w-[1440px] mx-auto px-[2.5rem] py-[2.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2.5rem] mb-[2.5rem]">
          {/* Left Column - Event Information */}
          <div className="flex flex-col">
            {/* Event Title */}
            <h2 className="text-[2rem] leading-[3rem] font-bold text-black mb-[1.5rem] font-poppins">
              {event.title}
            </h2>

            {/* Date and Time */}
            <div className="mb-[1.5rem]">
              <div className="flex items-center gap-[0.5rem] mb-[0.5rem]">
                <MaterialIcon
                  icon="calendar_today"
                  sizePx={16}
                  className="text-black"
                />
                <p className="text-[1rem] leading-[1.5rem] font-bold text-black font-poppins">
                  {formattedDate}
                </p>
              </div>
              <div className="flex items-center gap-[0.5rem] mb-[0.25rem]">
                <MaterialIcon
                  icon="access_time"
                  sizePx={16}
                  className="text-black"
                />
                <p className="text-[1rem] leading-[1.5rem] font-bold text-black font-poppins">
                  {dayOfWeek} as {formattedTime}
                </p>
              </div>
              <p className="text-[0.75rem] leading-[1.125rem] font-bold text-black font-poppins">
                Horarios referentes ao local do evento
              </p>
            </div>

            {/* Address */}
            <div className="flex items-center gap-[0.5rem] mb-[1.5rem]">
              <MaterialIcon icon="place" sizePx={16} className="text-black" />
              <p className="text-[1rem] leading-[1.5rem] font-bold text-black font-poppins">
                {event.address}
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-[1.5rem] leading-[2.25rem] font-bold text-black mb-[1rem] font-poppins">
                Descrição do evento
              </h3>
              <p className="text-[0.875rem] leading-[1.3125rem] font-normal text-black font-poppins whitespace-pre-line">
                {event.description}
              </p>
            </div>
          </div>

          {/* Right Column - Event Images */}
          <div className="flex flex-col">
            <ImageCarousel
              images={images}
              alt={event.title}
              className="mb-[1.5rem]"
              height="22.5625rem"
            />

            {/* Action Buttons */}
            <div className="flex items-center gap-[1rem] mb-[1.5rem]">
              <button className="flex items-center gap-[0.5rem] text-[1rem] leading-[1rem] font-semibold text-black font-poppins hover:opacity-80 transition-opacity">
                <MaterialIcon icon="comment" sizePx={38} />
                <span>
                  {commentsData?.pagination.total ?? 0} comentário
                  {commentsData?.pagination.total !== 1 ? "s" : ""}
                </span>
              </button>
              <button className="flex items-center gap-[0.5rem] text-[1rem] leading-[1rem] font-semibold text-black font-poppins hover:opacity-80 transition-opacity">
                <MaterialIcon icon="send" sizePx={37} />
              </button>
              <button
                onClick={() => favorite()}
                disabled={isPending}
                className="ml-auto hover:opacity-80 transition-opacity"
              >
                <MaterialIcon
                  icon={isFavorited ? "bookmark_added" : "bookmark_border"}
                  sizePx={37}
                />
              </button>
            </div>

            {/* Comments Section */}
            <div className="border border-black rounded-[1.25rem] p-[1rem]">
              {isLoadingComments ? (
                <CommentsSkeleton />
              ) : commentsData && commentsData.comments.length > 0 ? (
                <div className="space-y-[1rem] mb-[1.5rem]">
                  {commentsData.comments.map((comment) => (
                    <div key={comment.id}>
                      <p className="text-[1rem] leading-[1.3rem] font-semibold text-black font-roboto">
                        <span className="font-bold">{comment.user.name}: </span>{" "}
                        {comment.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-[2rem]">
                  <p className="text-[0.875rem] leading-[1.3125rem] font-normal text-gray-600 font-poppins">
                    Nenhum comentário ainda. Seja o primeiro!
                  </p>
                </div>
              )}

              {/* Comment Input */}
              <form onSubmit={handleSubmit(onSubmitComment)}>
                <InputForm
                  name="description"
                  control={control}
                  placeholder="DEIXE UM COMENTARIO"
                  hideErrorMessage={false}
                  className="mb-0"
                  inputClassName="w-full px-[1.25rem] py-[0.75rem] border border-black rounded-[2.5rem] text-[0.75rem] leading-[0.9375rem] font-light text-black placeholder-black font-poppins focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  disabled={isCreatingComment}
                />
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full">
          <h3 className="text-[2.5rem] leading-[3.25rem] font-medium text-black mb-[1.5rem] font-poppins">
            Mapa
          </h3>
          <EventMap
            latitude={event.latitude}
            longitude={event.longitude}
            address={event.address}
            height="34.4375rem"
          />
        </div>
      </div>
    </div>
  );
}
