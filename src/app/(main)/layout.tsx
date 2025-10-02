import { socket } from '@/api/socket';
import Header from '@/components/Header';
import { FC } from 'react';
const LayoutMain: FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <div className="wrapper-bg-blue">
      <Header />
      {children}
    </div>
  );
};

export default LayoutMain;
