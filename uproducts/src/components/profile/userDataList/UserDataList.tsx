'use client';
import AddressForm from '@/components/form/addressForm/AddressForm';
import { Button } from '@/components/ui/button';
import { useGetUserQuery } from '@/lib/redux/apiSlice/apiSlice';
import { useCallback, useState } from 'react';

function UserDataList() {
  const [isEdite, setIsEdit] = useState<boolean>(false);
  const { data, refetch, isLoading } = useGetUserQuery();

  const handelChange = useCallback(() => {
    setIsEdit(!isEdite);
  }, [isEdite]);

  if (isLoading) return <div>Loading...</div>;

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
            <div className="flex flex-col justify-center items-start gap-2 w-full">
              <span className="text-lg font-medium mt-5">Your delivery address:</span>
              {!isEdite ? (
                userAddress
              ) : (
                <AddressForm
                  userId={data.data?.id}
                  refresh={refetch}
                  address={data?.data?.address}
                  isEdit={isEdite}
                  onChange={handelChange}
                />
              )}
              {!isEdite ? <Button onClick={handelChange}>Edite address</Button> : null}
            </div>
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
