import { FC } from 'react';
import EditProfileModal from './EditProfile';
import DeleteQuizModal from './DeleteQuiz';

const Modals: FC = () => {
  return (
    <>
      <EditProfileModal />
      <DeleteQuizModal />
    </>
  );
};

export default Modals;
