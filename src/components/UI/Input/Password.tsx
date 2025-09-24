'use client';

import { useId, useState, type FC } from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';
import type { InputProps } from './index';
import { Eye, EyeOff, Lock } from 'lucide-react';

const InputPassword: FC<InputProps> = ({
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
  const [showPassword, setShowPassword] = useState(false);

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
          type={!showPassword ? 'password' : 'text'}
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
        <span
          onClick={() => setShowPassword(prev => !prev)}
          className={styles.eye}>
          {!showPassword ? (
            <Eye size={22} strokeWidth={1.5} />
          ) : (
            <EyeOff size={22} strokeWidth={1.5} />
          )}
        </span>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
export default InputPassword;
