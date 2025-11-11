import { Prisma } from "@prisma/client";
import { EventCommentsRepository } from "../event-comments-repository";
import { prisma } from "@/lib/prisma";


export class PrismaEventCommentsRepository implements EventCommentsRepository {
    async create(data: Prisma.EventCommentsUncheckedCreateInput) {
        const comments = await prisma.eventComments.create({
            data
        })

        return comments
    }

    async findCommentsByEnventIdPaginated(eventId: string, page: number, per_page: number) {
        const skip = (page - 1) * per_page

        const comments = await prisma.eventComments.findMany({
            where: {
                event_id: eventId,
                deleted_at: null
            },
            skip,
            take: per_page,
            orderBy: { created_at: 'asc' },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true
                    }
                },
            }
        })

        return comments
    }

    async countEventComments(eventId: string) {
        const total = await prisma.eventComments.count({
            where: {
                deleted_at: null,
                event_id: eventId
            }
        })

        return total
    }
}