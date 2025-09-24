import Header from '@/components/Header';
import { FC } from 'react';

const LayoutMain: FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  return (
    <div className="wrapper-main">
      <Header />
      {children}
    </div>
  );
};

export default LayoutMain;
