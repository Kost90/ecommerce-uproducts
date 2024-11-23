'use client';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

function SearchInput({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    if (term.trim()) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`/search?${params.toString()}`);
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div className="relative flex flex-shrink-0 w-full md:w-80">
      <Input
        type="text"
        placeholder={placeholder}
        className="text-black"
        onChange={handleInputChange}
        defaultValue={searchParams.get('query')?.toString()}
      />

      <Search className="text-muted-foreground absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
    </div>
  );
}

export default SearchInput;
