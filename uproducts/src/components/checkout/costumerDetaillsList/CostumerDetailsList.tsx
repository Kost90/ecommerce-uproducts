import TypographyH4 from '@/components/typography/TypographyH4';
import { ICostumerData } from '@/lib/redux/reducers/orders/ordersSlice';
import { formatDeliveryAddress } from '@/helpers/helpers';

interface ICostumerDetailsListProps {
  costumerDetails: Partial<ICostumerData>;
}

const CostumerDetailsList = ({ costumerDetails }: ICostumerDetailsListProps): React.JSX.Element => {
  const { firstname, lastname, phone, email, deliveryAdress } = costumerDetails;

  return (
    <div className="flex flex-col gap-3">
      {firstname || lastname ? (
        <div>
          <TypographyH4 text="Full name:" />
          <ul>
            <li className="text-muted-foreground">{`${firstname ?? ''} ${lastname ?? ''}`.trim()}</li>
          </ul>
        </div>
      ) : null}
      {phone || email ? (
        <div>
          <TypographyH4 text="Contacts:" />
          <ul>
            {phone && <li className="text-muted-foreground">{phone}</li>}
            {email && <li className="text-muted-foreground">{email}</li>}
          </ul>
        </div>
      ) : null}
      {deliveryAdress ? (
        <div>
          <TypographyH4 text="Delivery address:" />
          <ul>
            <li className="text-muted-foreground">{formatDeliveryAddress(deliveryAdress)}</li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default CostumerDetailsList;
