"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function SearchInput({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // ! Думаю как сделать, чтоб при нажатии на enter перелетало на страницу Search с параметрами
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`/search?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-shrink-0 w-full md:w-80">
      <Input
        type="text"
        placeholder={placeholder}
        className="text-black"
        onChange={(e) => {
          handleSearch(e.currentTarget.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />

      <Search className="text-muted-foreground absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
    </div>
  );
}

export default SearchInput;
