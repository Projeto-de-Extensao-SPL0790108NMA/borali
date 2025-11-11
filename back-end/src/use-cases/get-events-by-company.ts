import { CompaniesRepository } from "@/repositories/companies-repository";
import { EventsRepository } from "@/repositories/events-repository";
import { CompanyNotExistsError } from "./errors/company-not-exists-error";

interface GetEventsByCompanyUseCaseRequest {
  companyId: string
  page: number
  per_page: number
}

interface GetEventsByCompanyUseCaseResponse {
  events: {
    id: string
    title: string
    description: string | null
    address: string
    date: Date
    latitude: number
    longitude: number
    company_id: string
    created_at: Date
    updated_at: Date
  }[]
  pagination: {
    page: number
    per_page: number
    total: number
    total_pages: number
  }
}

export class GetEventsByCompanyUseCase {
  constructor(
    private eventsRepository: EventsRepository,
    private companiesRepository: CompaniesRepository
  ) {}

  async execute({
    companyId,
    page,
    per_page
  }: GetEventsByCompanyUseCaseRequest): Promise<GetEventsByCompanyUseCaseResponse> {
    const companyExists = await this.companiesRepository.findById(companyId)

    if (!companyExists) {
      throw new CompanyNotExistsError()
    }

    const [events, total] = await Promise.all([
      this.eventsRepository.findManyByCompanyPaginated(companyId, page, per_page),
      this.eventsRepository.countByCompany(companyId),
    ])

    const total_pages = Math.ceil(total / per_page)

    return {
      events,
      pagination: {
        page,
        per_page,
        total,
        total_pages
      }
    }
  }
}
