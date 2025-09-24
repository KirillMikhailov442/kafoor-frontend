'use client';

import { useId, useState, type FC } from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';
import type { InputProps } from '.';

const InputEmail: FC<InputProps> = ({
  label,
  error,
  ref,
  leftIcon,
  rightIcon,
  onChange,
  onBlur,
  placeholder,
  name,
  value,
  className,
  ...props
}) => {
  const id = useId();
  const [inputValue, setInputValue] = useState(value);
  return (
    <div className={clsx(styles.wrapper, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div
        className={clsx(styles.content, {
          [styles.contentError]: error,
        })}>
        <input
          type="email"
          id={id}
          ref={ref}
          placeholder={placeholder}
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
          onChange={e => {
            if (onChange) onChange(e);
            setInputValue(e.target.value);
          }}
          value={inputValue}
          onBlur={onBlur}
          name={name}
          className={clsx(styles.input, {
            [`${styles.inputWithIcon}`]: leftIcon,
            [`${styles.inputWithRightIcon}`]: rightIcon,
            [`${styles.inputError}`]: error,
          })}
          {...props}
        />
        <span className={styles.icon}>{leftIcon}</span>
        <span className={styles.rightIcon}>{rightIcon}</span>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
export default InputEmail;
