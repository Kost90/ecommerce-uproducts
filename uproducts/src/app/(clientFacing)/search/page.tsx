async function Search({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  // ! на основании query фетчу определенній продукт думаю на счет Suspence и Fallback, чтоб сначала показівать скелетоны и пропсами передаю в компонент лист карточек query для фетча

  return <div>{query}</div>;
}

export default Search;
