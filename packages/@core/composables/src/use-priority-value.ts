import type { ComputedRef, Ref } from 'vue';

import {
  computed,
  getCurrentInstance,
  unref,
  useAttrs,
  useSlots,
} from 'vue';

import { isNonNullish, toCamelCase } from '@vinicunca/perkakas';

/**
 * Get values from slots, attrs, props, and state in turn
 */
export function usePriorityValue<
  T extends Record<string, any>,
  S extends Record<string, any>,
  K extends keyof T = keyof T,
>(
  { key, props, state }:
  { key: K; props: T; state: Readonly<Ref<NoInfer<S>>> | undefined },
) {
  const instance = getCurrentInstance();
  const slots = useSlots();
  const attrs = useAttrs() as T;

  return computed((): T[K] => {
    // Whether props are passed or not, there will be a default value, which will affect the order here.
    // Determine whether to pass in by judging whether the original props has a value
    const rawProps = (instance?.vnode?.props || {}) as T;

    const standardRawProps = {} as T;

    for (const [key, value] of Object.entries(rawProps)) {
      standardRawProps[toCamelCase(key) as K] = value;
    }

    const propsKey = standardRawProps?.[key] === undefined
      ? undefined
      : props[key];

    return [
      slots[key as string],
      attrs[key],
      propsKey,
      state?.value?.[key as keyof S],
    ].find(isNonNullish) as T[K];
  });
}

/**
 * Get the values in state in batches (each value is a ref)
 */
export function usePriorityValues<
  T extends Record<string, any>,
  S extends Ref<Record<string, any>> = Readonly<Ref<NoInfer<T>, NoInfer<T>>>,
>(
  { props, state }: { props: T; state: S | undefined },
) {
  const result: { [K in keyof T]: ComputedRef<T[K]> } = {} as never;

  (Object.keys(props) as Array<keyof T>).forEach((key) => {
    result[key] = usePriorityValue({
      key: key as keyof typeof props,
      props,
      state,
    });
  });

  return result;
}

/**
 * Batch get the value in the state (concentrated in a computed for transparent transmission)
 */
export function useForwardPriorityValues<
  T extends Record<string, any>,
  S extends Ref<Record<string, any>> = Readonly<Ref<NoInfer<T>, NoInfer<T>>>,
>(
  { props, state }: { props: T; state: S | undefined },
) {
  const computedResult: { [K in keyof T]: ComputedRef<T[K]> } = {} as never;

  (Object.keys(props) as Array<keyof T>).forEach((key) => {
    computedResult[key] = usePriorityValue({
      key: key as keyof typeof props,
      props,
      state,
    });
  });

  return computed(() => {
    const unwrapResult: Record<string, any> = {};

    Object.keys(props).forEach((key) => {
      unwrapResult[key] = unref(computedResult[key]);
    });

    return unwrapResult as { [K in keyof T]: T[K] };
  });
}
