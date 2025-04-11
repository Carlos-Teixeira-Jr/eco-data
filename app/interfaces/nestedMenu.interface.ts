// Definição da interface para cada item do dropdown
export interface DropdownOption {
  value: string;
  label: string;
  type?: string;
  options?: DropdownOption[];
}
