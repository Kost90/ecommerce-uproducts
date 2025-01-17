import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

type SelectProps = {
  name: string;
  defaultValue: string | undefined;
};

export function SelectComponent({ name, defaultValue }: SelectProps) {
  return (
    <Select name={name} defaultValue={defaultValue} required>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select catogories" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="drinks">Drinks</SelectItem>
          <SelectItem value="coffee">Coffee</SelectItem>
          <SelectItem value="oil">Oil</SelectItem>
          <SelectItem value="chocolate">Chocolate</SelectItem>
          <SelectItem value="products">Products</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
