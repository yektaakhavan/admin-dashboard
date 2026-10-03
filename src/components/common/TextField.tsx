import { useId } from 'react';

import { Input } from '@/components/ui/input';

interface TextFieldProps extends React.ComponentProps<'input'> {
  label: string;
  error?: string;
}

// Label + input + validation message, wired together for accessibility.
// Works with react-hook-form: <TextField label="Name" {...register('name')} />
export default function TextField({
  label,
  error,
  id,
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="text-sm font-medium">
        {label}
      </label>

      <Input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />

      {error && (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
