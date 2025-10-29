import { socket } from '@/api/socket';
import Header from '@/components/Header';
import Modals from '@/components/Modals';
import { FC } from 'react';
const LayoutMain: FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <div className="wrapper-bg-blue">
      <Header />
      <Modals />
      {children}
    </div>
  );
};

export default LayoutMain;
