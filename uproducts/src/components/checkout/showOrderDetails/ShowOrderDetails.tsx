import React from 'react';
import CostumerDetailsList from '../costumerDetaillsList/CostumerDetailsList';
import { selectCostumerDetails } from '@/lib/redux/selectors/ordersSelectors';
import { selectCartData, selectCartItemsWithoutPicture } from '@/lib/redux/selectors/cartSelectors';
import { useAppSelector } from '@/hooks/hooks';
import { Button } from '@/components/ui/button';
import TypographyH2 from '@/components/typography/TypographyH2';
import OrderedProductsList from '../orderedProductsList/OrderedProductsList';
import { addnewOrder } from '@/lib/redux/reducers/orders/ordersSlice';
import { useDispatch } from 'react-redux';

function ShowOrderDetails({ onClick }: { onClick: () => void }): React.JSX.Element {
  const dispatch = useDispatch();
  const costumerDetails = useAppSelector(selectCostumerDetails);
  const cartData = useAppSelector(selectCartData);
  const cartDataWithouPicture = useAppSelector(selectCartItemsWithoutPicture);
  console.log(costumerDetails);
  console.log(cartData);
  console.log(cartDataWithouPicture);

  const handelAddOrder = (): void => {
    const randomPart = Math.floor(1000 + Math.random() * 9000); // Случайное число от 1000 до 9999
    const orderNumber = `ORD-${Date.now()}-${randomPart}`;
    const order = {
      orderNumber: orderNumber,
      items: cartDataWithouPicture,
      costumerDetails: costumerDetails,
      pricePaidInCents: `${cartData.totalPrice}`,
    };

    dispatch(addnewOrder(order));
  };
  return (
    <>
      <TypographyH2 text="Costumer details and delivery address:" />
      <div className="flex flex-col gap-8 my-8 w-full">
        <div className="flex flex-col lg:flex-row justify-start items-start gap-10">
          <CostumerDetailsList costumerDetails={costumerDetails} />
          <OrderedProductsList cartDataProp={cartData} />
        </div>
        <div className="flex items-center gap-16">
          <Button onClick={onClick} className="w-32">
            back
          </Button>
          <Button onClick={handelAddOrder} className="w-32">
            Confirm
          </Button>
        </div>
      </div>
    </>
  );
}

export default ShowOrderDetails;
