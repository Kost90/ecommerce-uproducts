'use client';
import AddressForm from '@/components/form/addressForm/AddressForm';
import { useGetUserQuery } from '@/lib/redux/apiSlice/apiSlice';

function UserDataList() {
  const { data, refetch } = useGetUserQuery();

  const userAddress = (
    <span className="text-base font-normal">{`${data?.data?.address?.country}, ${data?.data?.address?.city}, ${data?.data?.address?.street}, ${data?.data?.address?.number}, ${data?.data?.address?.postalCode}`}</span>
  );

  const userNotFound = <span className="text-base font-normal">Opps user data not found</span>;

  return (
    <>
      {data?.data ? (
        <div className="flex items-start justify-center flex-col gap-1 my-10">
          <span className="text-2xl font-bold">{`${data?.data?.firstname} ${data?.data?.lastname}`}</span>

          {data.data?.address ? (
            <>
              <span className="text-lg font-medium mt-5">Your delivery address:</span>
              {userAddress}
            </>
          ) : (
            <>
              <span className="text-lg font-medium mt-5">Set up your delivery address:</span>
              <AddressForm userId={data.data?.id} refresh={refetch} />
            </>
          )}
        </div>
      ) : (
        userNotFound
      )}
    </>
  );
}

export default UserDataList;
