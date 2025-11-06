export interface ErrorDTO {
  statusCode: number;
  isSuccess: boolean;
  errors: ErrorsDetails[];
}

type ErrorsDetails = {
  errorMessages: string[];
  propertyName: string;
};

export interface ExtendedErrorDTO extends ErrorDTO {
  detail?: string;
  message?: string;
}
