'use client';

import styles from './Select.module.scss';
import {
  Portal,
  Select as CSelect,
  createListCollection,
  SelectValueChangeDetails,
} from '@chakra-ui/react';
import { FC } from 'react';

interface Framework {
  label: string;
  value: string;
}

interface SelectProps {
  items?: Framework[];
  label: string;
  text?: string;
  defaultValue?: string[];
  onValueChange?: (details: SelectValueChangeDetails<Framework>) => void;
}

const Select: FC<SelectProps> = ({
  items,
  label,
  text,
  defaultValue,
  onValueChange,
}) => {
  const frameworks = createListCollection<Framework>({
    items: items ?? [],
  });
  return (
    <CSelect.Root
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      collection={frameworks}
      width="320px">
      <CSelect.HiddenSelect />
      <CSelect.Label className={styles.label}>{label}</CSelect.Label>
      <CSelect.Control>
        <CSelect.Trigger>
          <CSelect.ValueText placeholder={text} />
        </CSelect.Trigger>
        <CSelect.IndicatorGroup>
          <CSelect.Indicator />
        </CSelect.IndicatorGroup>
      </CSelect.Control>
      <Portal>
        <CSelect.Positioner>
          <CSelect.Content>
            {frameworks.items.map(framework => (
              <CSelect.Item item={framework} key={framework.value}>
                {framework.label}
                <CSelect.ItemIndicator />
              </CSelect.Item>
            ))}
          </CSelect.Content>
        </CSelect.Positioner>
      </Portal>
    </CSelect.Root>
  );
};

export default Select;
