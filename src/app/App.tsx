import { Wrapper, WrapperMain } from './App.styled';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <Wrapper>
      <Header />
      {/* TODO: fix wrapper layers */}
      <WrapperMain>
        <Outlet />
      </WrapperMain>
      <Footer />
    </Wrapper>
  );
};

export default App;
