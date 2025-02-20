'use client';
import { useGetUserQuery } from '@/lib/redux/apiSlice/apiSlice';

function UserDataList() {
  const { data } = useGetUserQuery();

  const userAddress = (
    <span className="text-base font-normal">{`${data?.data?.address?.country}, ${data?.data?.address?.city}, ${data?.data?.address?.street}, ${data?.data?.address?.number}, ${data?.data?.address?.postalCode}`}</span>
  );

  return (
    <>
      {data ? (
        <div className="flex items-start justify-center flex-col gap-1 my-10">
          <span className="text-2xl font-bold">{`${data?.data?.firstname} ${data?.data?.lastname}`}</span>
          <span className="text-lg font-medium mt-5">Your delivery address:</span>
          {data.data?.address ? userAddress : <span>setUp your address</span>}
        </div>
      ) : null}
    </>
  );
}

export default UserDataList;
