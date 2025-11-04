export function InputError({ errorMessage }: { errorMessage: string }) {
  return (
    <span className="text-danger-pure text-base leading-6 font-medium tracking-tight">
      {errorMessage}
    </span>
  );
}

InputError.displayName = 'InputError';
