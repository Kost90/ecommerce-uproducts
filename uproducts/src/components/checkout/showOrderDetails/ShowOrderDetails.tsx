'use client';
import CostumerDetailsList from '../costumerDetaillsList/CostumerDetailsList';
import { selectCostumerDetails } from '@/lib/redux/selectors/ordersSelectors';
import { selectCartData, selectCartItemsWithoutPicture } from '@/lib/redux/selectors/cartSelectors';
import { useAppSelector } from '@/hooks/hooks';
import { Button } from '@/components/ui/button';
import TypographyH2 from '@/components/typography/TypographyH2';
import OrderedProductsList from '../orderedProductsList/OrderedProductsList';
import { addnewOrder } from '@/lib/redux/reducers/orders/ordersSlice';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/lib/redux/reducers/cart/cartSlice';
import { openModal } from '@/lib/redux/reducers/modal/modalSlice';
import Link from 'next/link';
import { useState } from 'react';
import AdminLoading from '@/app/profile/loading';
import { IUserResponse } from '@/types/userTypes';
import UserDetailsListFromDB from '../userDetailsFromDB/UserDetailsListFromDB';

function ShowOrderDetails({ onClick, userDataFromDb }: { onClick: () => void; userDataFromDb?: IUserResponse }): React.JSX.Element {
  const dispatch = useDispatch();
  const costumerDetails = useAppSelector(selectCostumerDetails);
  const cartData = useAppSelector(selectCartData);
  const cartDataWithouPicture = useAppSelector(selectCartItemsWithoutPicture);

  // ! just for showing loader, in production change for real request
  const [isLoading, setIsLoading] = useState(false);

  const handelAddOrder = async (): Promise<void> => {
    setIsLoading(true);
    // ! just for showing loader
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ORD-${Date.now()}-${randomPart}`;
    const order = {
      orderNumber: orderNumber,
      items: cartDataWithouPicture,
      costumerDetails: costumerDetails,
      pricePaidInCents: `${cartData.totalPrice}`,
    };

    dispatch(addnewOrder(order));
    dispatch(clearCart());
    setIsLoading(false);
    dispatch(openModal({ componentProps: { title: 'Thank you for your order', text: `your order number is: ${order.orderNumber}` } }));
  };

  if (isLoading) {
    return <AdminLoading />;
  }

  return (
    <>
      <TypographyH2 text="Costumer details and delivery address:" />
      <div className="flex flex-col gap-8 my-8 w-full">
        <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start gap-10">
          {userDataFromDb ? <UserDetailsListFromDB user={userDataFromDb} /> : <CostumerDetailsList costumerDetails={costumerDetails} />}
          <OrderedProductsList cartDataProp={cartData} />
        </div>
        <div className="flex items-center gap-16 flex-wrap">
          {!userDataFromDb ? (
            <Button onClick={onClick} className="min-w-32">
              Change details
            </Button>
          ) : null}
          {Object.keys(cartData.items).length !== 0 ? (
            <Button onClick={handelAddOrder} className="w-32">
              Confirm
            </Button>
          ) : (
            <Button>
              <Link href={'/'}>Continue shopping</Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default ShowOrderDetails;
