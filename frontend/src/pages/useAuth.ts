import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../store/userSlice';
import type { RootState, AppDispatch } from '../store';

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.user);
  const fetchUser = useCallback(async () => {
    await dispatch(fetchCurrentUser());
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading };
}
