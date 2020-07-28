export default function formatInputData(value: string | React.ChangeEvent<HTMLInputElement>): string {
  if (!value) {
    return value;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (value.target) {
    return value.target.value;
  }

  return (value as unknown) as string;
}
