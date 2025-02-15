'use client';
import TypographyH3 from '@/components/typography/TyphographyH3';
import { useGetUserQuery } from '@/lib/redux/apiSlice/apiSlice';

function UserDataList() {
  const { data } = useGetUserQuery();

  return (
    <div>
      <TypographyH3 text={data?.data?.firstname as string} />
      <TypographyH3 text={data?.data?.lastname as string} />
    </div>
  );
}

export default UserDataList;
