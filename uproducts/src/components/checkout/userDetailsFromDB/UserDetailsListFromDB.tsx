import TypographyH4 from '@/components/typography/TypographyH4';
import { IUserResponse } from '@/types/userTypes';

function UserDetailsListFromDB({ user }: { user: IUserResponse }) {
  return (
    <div className="flex flex-col gap-3">
      {user.firstname || user.lastname ? (
        <div>
          <TypographyH4 text="Full name:" />
          <ul>
            <li className="text-muted-foreground">{`${user.firstname ?? ''} ${user.lastname ?? ''}`.trim()}</li>
          </ul>
        </div>
      ) : null}
      {user.telephone || user.email ? (
        <div>
          <TypographyH4 text="Contacts:" />
          <ul>
            {user.telephone && <li className="text-muted-foreground">{user.telephone}</li>}
            {user.email && <li className="text-muted-foreground">{user.email}</li>}
          </ul>
        </div>
      ) : null}
      {user.address ? (
        <div>
          <TypographyH4 text="Delivery address:" />
          <span className="text-muted-foreground">{`${user.address.country}, ${user.address.city}, ${user.address.street}, ${user.address.number}, ${user.address.postalCode}`}</span>
        </div>
      ) : null}
    </div>
  );
}

export default UserDetailsListFromDB;
