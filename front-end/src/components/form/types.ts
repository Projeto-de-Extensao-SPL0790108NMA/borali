import { InputBase, InputProps } from "../ui/input-base";

export interface InputCustomProps
  extends React.ComponentProps<typeof InputBase> {
  label?: string;
  isRequired?: boolean;
  labelClassName?: string;
  errorMessage?: string;
  hideErrorMessage?: boolean;
  inputClassName?: string;
  tooltip?: string;
}

export interface TextareaCustomProps {
  label?: string;
  isRequired?: boolean;
  labelClassName?: string;
  errorMessage?: string;
  hideErrorMessage?: boolean;
  textareaClassName?: string;
}

export type InputFormProps = InputCustomProps & InputProps;
