'use client';
import { TypographyLead } from '@/components/typography/TypographyLead';
import { TypographyMuted } from '@/components/typography/TypographyMuted';
import { useGetUserQuery } from '@/lib/redux/apiSlice/apiSlice';

function UserDataList() {
  const { data } = useGetUserQuery();

  return (
    <div className="flex items-start justify-center flex-col gap-3 my-10">
      <TypographyLead text="First name:" />
      <TypographyMuted text={data?.data?.firstname as string} className="text-orange font-medium" />
      <TypographyLead text="Last name:" />
      <TypographyMuted text={data?.data?.lastname as string} className="text-orange font-medium" />
      <TypographyLead text="Costumer address:" />
      <TypographyMuted text={data?.data?.address?.country as string} />
      <TypographyMuted text={data?.data?.address?.city as string} />
      <TypographyMuted text={data?.data?.address?.street as string} />
      <span className="text-sm text-muted-foreground hover:text-black">{data?.data?.address?.numbe as string}</span>
      <TypographyMuted text={data?.data?.address?.postalCode as string} />
    </div>
  );
}

export default UserDataList;
