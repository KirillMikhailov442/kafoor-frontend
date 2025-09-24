import { NextPage } from 'next';
import styles from './Question.module.scss';
import Header from '../Header';
import clsx from 'clsx';
import Option from '../Option';
import Image from 'next/image';
import img from '@images/login-bg.jpg';

const Question: NextPage = () => {
  return (
    <div className="wrapper-bg-blue">
      <Header />
      <div className="flex flex-grow">
        <div className={clsx('k-container', styles.content)}>
          <div className={styles.top}>
            <h4 className={styles.text}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est
              voluptatem, ut pariatur eum laborum delectus natus illum iste
              obcaecati, doloribus, totam placeat repellat quia amet odit modi
              at labore voluptatibus?
            </h4>
            <div className={styles.file}>
              <Image alt="img" src={img} />
            </div>
          </div>
          <div className={styles.bottom}>
            <Option index={1} text="Ответ 1" />
            <Option index={2} text="Ответ 2" />
            <Option index={3} text="Ответ 3" />
            <Option index={4} text="Ответ 4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
