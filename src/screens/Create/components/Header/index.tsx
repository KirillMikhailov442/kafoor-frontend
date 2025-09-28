'use client';

import { FC, useState } from 'react';
import styles from './Header.module.scss';
import { Button, Editable, InputGroup, NumberInput } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Users } from 'lucide-react';

const Header: FC = () => {
  const { push } = useRouter();
  const [name, setName] = useState('');
  return (
    <header className={styles.header}>
      <div className="flex gap-2 items-center">
        <Link href={'/'} className={styles.logo}>
          <h4>K</h4>
        </Link>
        <Editable.Root
          width={250}
          maxLength={32}
          maxLines={1}
          className={styles.name}
          textAlign="start"
          value={name}
          placeholder={'Название викторины...'}
          onValueChange={details => setName(details.value)}
          defaultValue={name}>
          <Editable.Preview
            color={name ? 'black' : 'gray.400'}
            fontStyle={name ? 'normal' : 'italic'}
          />
          <Editable.Input />
        </Editable.Root>
      </div>

      <nav className={styles.actions}>
        <NumberInput.Root defaultValue="5" min={2} max={10} width="100px">
          <NumberInput.Control />
          <InputGroup
            startElementProps={{ pointerEvents: 'auto' }}
            startElement={
              <NumberInput.Scrubber>
                <Users size={20} />
              </NumberInput.Scrubber>
            }>
            <NumberInput.Input />
          </InputGroup>
        </NumberInput.Root>
        <Button
          onClick={() => push('/')}
          variant={'subtle'}
          colorPalette={'blue'}>
          Выйти
        </Button>
        <Button colorPalette={'blue'}>Сохранить</Button>
      </nav>
    </header>
  );
};

export default Header;
