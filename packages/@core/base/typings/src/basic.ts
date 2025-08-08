export interface BasicOption {
  label: string;
  value: string;
}

export type SelectOption = BasicOption;

export type TabOption = BasicOption;

export type ClassType = Array<object | string> | object | string;

export interface ClassTypeProps {
  class?: ClassType;
}
