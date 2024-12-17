import React from 'react';
import CostumerDetailsList from '../costumerDetaillsList/CostumerDetailsList';
import { selectCostumerDetails } from '@/lib/redux/selectors/ordersSelectors';
import { selectCartData } from '@/lib/redux/selectors/cartSelectors';
import { useAppSelector } from '@/hooks/hooks';
import { Button } from '@/components/ui/button';
import TypographyH2 from '@/components/typography/TypographyH2';
import OrderedProductsList from '../orderedProductsList/OrderedProductsList';

function ShowOrderDetails({ onClick }: { onClick: () => void }): React.JSX.Element {
  const costumerDetails = useAppSelector(selectCostumerDetails);
  const cartData = useAppSelector(selectCartData);
  console.log(costumerDetails);
  console.log(cartData);
  return (
    <div className="flex flex-col gap-8">
      <TypographyH2 text="Costumer details and delivery address:" />
      <CostumerDetailsList costumerDetails={costumerDetails} />
      <OrderedProductsList cartDataProp={cartData} />
      <Button onClick={onClick} className="max-w-32">
        back
      </Button>
    </div>
  );
}

export default ShowOrderDetails;
