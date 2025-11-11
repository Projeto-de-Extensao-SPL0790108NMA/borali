import { EventsRepository } from '@/repositories/events-repository'
import { CompaniesRepository } from '@/repositories/companies-repository'
import { CompanyNotExistsError } from './errors/company-not-exists-error'

interface RegisterEventUseCaseRequest {
  title: string
  description?: string | null
  address: string
  date: Date
  latitude: number
  longitude: number
  company_id: string
}

interface RegisterEventUseCaseResponse {
  event: {
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
  }
}

export class RegisterEventUseCase {
  constructor(
    private eventsRepository: EventsRepository,
    private companiesRepository: CompaniesRepository
  ) {}

  async execute({
    title,
    description,
    address,
    date,
    latitude,
    longitude,
    company_id
  }: RegisterEventUseCaseRequest): Promise<RegisterEventUseCaseResponse> {
    const companyExists = await this.companiesRepository.findById(company_id)

    if (!companyExists) {
      throw new CompanyNotExistsError()
    }

    const event = await this.eventsRepository.create({
      title,
      description,
      address,
      date,
      latitude,
      longitude,
      company_id,
    })

    return { event }
  }
}
