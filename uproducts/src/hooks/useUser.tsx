import { useEffect, useState } from 'react';
import userServices from '@/api/services/userServices/userServices';
import { IUserResponse } from '@/types/userTypes';

function useUser() {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // TODO: Add here redux
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await userServices.getUserData();
        if (response.status === 200 && response.data) {
          setUser(response.data);
        } else {
          setError(response.error?.message || 'Failed to load user');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}

export default useUser;

// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, AppDispatch } from '@/lib/redux/store';
// import { fetchUser, logoutUser } from '@/lib/redux/reducers/user/userSlice';
// import { useEffect } from 'react';

// export default function useUser() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { user, loading } = useSelector((state: RootState) => state.user);

//   useEffect(() => {
//     if (!user) {
//       dispatch(fetchUser());
//     }
//   }, [user, dispatch]);

//   return { user, loading, logout: () => dispatch(logoutUser()) };
// }
