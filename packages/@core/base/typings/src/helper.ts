import type { ComputedRef, MaybeRef, VNode } from 'vue';

export type ClassValue = ClassNameArray | string | null | undefined | 0 | 0n | false;
type ClassNameArray = Array<ClassValue>;

export type GetObjectField<MaybeObject, Key extends string> = MaybeObject extends Record<string, any>
  ? MaybeObject[Key]
  : never;

export type DynamicSlotsKeys<Name extends string | undefined, Suffix extends string | undefined = undefined> = (
  Name extends string
    ? Suffix extends string
      ? Name | `${Name}-${Suffix}`
      : Name
    : never
);

export type DynamicSlots<
  T extends { slot?: string },
  Suffix extends string | undefined = undefined,
  ExtraProps extends object = object,
> = {
  [K in DynamicSlotsKeys<T['slot'], Suffix>]: (
    props: { item: Extract<T, { slot: K extends `${infer Base}-${Suffix}` ? Base : K }> } & ExtraProps
  ) => any
};

export type ArrayOrNested<T> = Array<T> | Array<Array<T>>;
export type NestedItem<T> = T extends Array<infer I> ? NestedItem<I> : T;
type AllKeys<T> = T extends any ? keyof T : never;
type NonCommonKeys<T extends object> = Exclude<AllKeys<T>, keyof T>;
type PickTypeOf<T, K extends string | number | symbol> = K extends AllKeys<T>
  ? T extends { [k in K]?: any }
    ? T[K]
    : undefined
  : never;
export type MergeTypes<T extends object> = {
  [k in keyof T]: PickTypeOf<T, k>;
} & {
  [k in NonCommonKeys<T>]?: PickTypeOf<T, k>;
};

export type GetItemKeys<I> = keyof Extract<NestedItem<I>, object>;

export type GetItemValue<I, VK extends GetItemKeys<I> | undefined, T extends NestedItem<I> = NestedItem<I>>
= T extends object
  ? VK extends undefined
    ? T
    : VK extends keyof T
      ? T[VK]
      : never
  : T;

export type GetModelValue<
  T,
  VK extends GetItemKeys<T> | undefined,
  M extends boolean,
> = M extends true
  ? Array<GetItemValue<T, VK>>
  : GetItemValue<T, VK>;

export interface GetModelValueEmits<
  T,
  VK extends GetItemKeys<T> | undefined,
  M extends boolean,
> {
  /** Event handler called when the value changes. */
  'update:modelValue': [payload: GetModelValue<T, VK, M>];
}

export type EmitsToProps<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: T[K] extends [...args: infer Args]
    ? (...args: Args) => void
    : never
};

export type StringOrVNode = string
  | VNode
  | (() => VNode);

/**
 * Utility type to flatten intersection types for better IDE hover information.
 * @template T The type to flatten.
 */
type Id<T> = {} & { [P in keyof T]: T[P] };

type ComponentVariants<T extends { variants?: Record<string, Record<string, any>> }> = {
  [K in keyof T['variants']]: keyof T['variants'][K]
};

type ComponentSlots<T extends { slots?: Record<string, any> }> = Id<{
  [K in keyof T['slots']]?: ClassValue
}>;

/**
 * Defines the configuration shape expected for a component.
 * @template T The component's theme`.
 */
export interface PComponentConfig<
  T extends Record<string, any>,
> {
  variants: ComponentVariants<T>;
  slots: ComponentSlots<T>;
}

export type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>;

export type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>;
