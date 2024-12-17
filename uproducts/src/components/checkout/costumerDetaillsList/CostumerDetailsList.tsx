// import TypographyH4 from '@/components/typography/TypographyH4';
// import { ICostumerData } from '@/lib/redux/reducers/orders/ordersSlice';
// import React from 'react';

// interface ICostumerDetailsListProps {
//   costumerDetails: Partial<ICostumerData>;
// }

// function CostumerDetailsList({ costumerDetails }: ICostumerDetailsListProps): React.JSX.Element {
//   return (
//     <div className="flex flex-col gap-3">
//       <div>
//         <TypographyH4 text="Full name:" />
//         <li className="text-muted-foreground">{`${costumerDetails.firstname} ${costumerDetails.lastname}`}</li>
//       </div>
//       <div>
//         <TypographyH4 text="Contacts:" />
//         <li className="text-muted-foreground">{costumerDetails.phone!}</li>
//         <li className="text-muted-foreground">{costumerDetails.email!}</li>
//       </div>
//       <div>
//         <TypographyH4 text="Delivery address:" />
//         <li className="text-muted-foreground">{`${costumerDetails.deliveryAdress?.street_number}, ${costumerDetails.deliveryAdress!.route}, ${costumerDetails.deliveryAdress?.postal_town}, ${costumerDetails.deliveryAdress!.country}, ${costumerDetails.deliveryAdress!.postal_code}`}</li>
//       </div>
//     </div>
//   );
// }

// export default CostumerDetailsList;

import TypographyH4 from '@/components/typography/TypographyH4';
import { ICostumerData } from '@/lib/redux/reducers/orders/ordersSlice';
import React from 'react';

interface ICostumerDetailsListProps {
  costumerDetails: Partial<ICostumerData>;
}

// Функция для форматирования адреса
const formatDeliveryAddress = (address?: ICostumerData['deliveryAdress']): string | null => {
  if (!address) return null;

  const { street_number, route, postal_town, country, postal_code } = address;

  return [street_number, route, postal_town, country, postal_code]
    .filter(Boolean) // Убирает undefined или пустые значения
    .join(', ');
};

const CostumerDetailsList = ({ costumerDetails }: ICostumerDetailsListProps): React.JSX.Element => {
  const { firstname, lastname, phone, email, deliveryAdress } = costumerDetails;

  return (
    <div className="flex flex-col gap-3">
      {/* Full Name */}
      {firstname || lastname ? (
        <div>
          <TypographyH4 text="Full name:" />
          <ul>
            <li className="text-muted-foreground">{`${firstname ?? ''} ${lastname ?? ''}`.trim()}</li>
          </ul>
        </div>
      ) : null}

      {/* Contacts */}
      {phone || email ? (
        <div>
          <TypographyH4 text="Contacts:" />
          <ul>
            {phone && <li className="text-muted-foreground">{phone}</li>}
            {email && <li className="text-muted-foreground">{email}</li>}
          </ul>
        </div>
      ) : null}

      {/* Delivery Address */}
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
