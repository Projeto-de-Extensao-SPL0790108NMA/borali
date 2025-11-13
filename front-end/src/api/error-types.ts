export interface ErrorDTO {
  statusCode: number;
  isSuccess: boolean;
  message?: string;
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
