import { useCallback, useRef, useState } from 'react';

/**
 * A hook that supports both controlled and uncontrolled state patterns.
 *
 * When `controlledValue` is provided (not `undefined`), it takes precedence
 * over internal state, making the component controlled.
 *
 * When `controlledValue` is `undefined`, the hook manages state internally,
 * starting with `defaultValue`.
 *
 * @param controlledValue - The controlled value (from props).
 * @param defaultValue - The initial value for uncontrolled usage.
 * @param onChange - Optional callback fired on value changes.
 * @returns A tuple of `[currentValue, setValue]`.
 */
export function useControllableState<T>(
  controlledValue: T | undefined,
  defaultValue: T | undefined,
  onChange?: (value: T) => void
): [T | undefined, (value: T) => void] {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<T | undefined>(
    defaultValue
  );

  // Use a ref for onChange to avoid stale closures without needing it in deps.
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const currentValue = isControlled ? controlledValue : internalValue;

  const setValue = useCallback(
    (value: T) => {
      if (!isControlled) {
        setInternalValue(value);
      }
      onChangeRef.current?.(value);
    },
    [isControlled]
  );

  return [currentValue, setValue];
}
