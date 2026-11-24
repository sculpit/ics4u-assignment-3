type TextInputProps = {
  value: string;
  color?: string;
  text?: string;
};

export const TextInput = ({ value, color, text }: TextInputProps) => {
  return <span className={`${color} ${text}`}>{value}</span>;
};

