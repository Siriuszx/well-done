import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';

import { initAuth, selectFetchAuthDataState } from '@/features/auth/authSlice';

import Header from '@/layout/Header';
import ScrollToTop from '@/utils/ScrollToTop';
import { Outlet } from 'react-router-dom';
import { Wrapper, WrapperMain } from './App.styled';
import StatusNotificationContainer from '@/features/statusNotification/components/StatusNotificationContainer';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  const { isLoading } = useAppSelector(selectFetchAuthDataState);

  return (
    !isLoading && (
      <Wrapper>
        <ScrollToTop />
        <Header />
        <StatusNotificationContainer />
        <WrapperMain>
          <Outlet />
        </WrapperMain>
      </Wrapper>
    )
  );
};

export default App;
