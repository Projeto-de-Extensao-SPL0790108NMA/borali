import { EventComments, Prisma } from "@prisma/client";


export interface EventCommentsRepository {
    create(data: Prisma.EventCommentsUncheckedCreateInput): Promise<EventComments>
    findCommentsByEnventIdPaginated(eventId: string, page: number, per_page: number): Promise<EventComments[]>
    countEventComments(eventId: string): Promise<number>
}