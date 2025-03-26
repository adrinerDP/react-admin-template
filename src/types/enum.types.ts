/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

export class BaseEnum<IUnion extends string, IMeta = undefined> {
  private static instancesMap = new Map<Function, BaseEnum<string, any>[]>();

  constructor(
    public readonly code: IUnion,
    public readonly label: string,
    public readonly meta?: IMeta,
  ) {
    const constructor = this.constructor;
    if (!BaseEnum.instancesMap.has(constructor)) {
      BaseEnum.instancesMap.set(constructor, []);
    }
    BaseEnum.instancesMap.get(constructor)?.push(this);
  }

  static allCases<T extends BaseEnum<string, any>>(
    this: new (...args: any[]) => T,
  ): T[] {
    return (BaseEnum.instancesMap.get(this) as T[]) || [];
  }

  static fromCode<T extends BaseEnum<string, any>>(
    this: new (...args: any[]) => T,
    code: string,
  ): T | undefined {
    return BaseEnum.instancesMap
      .get(this)
      ?.find((instance) => instance.code === code) as T | undefined;
  }

  static fromLabel<T extends BaseEnum<string, any>>(
    this: new (...args: any[]) => T,
    label: string,
  ): T | undefined {
    return BaseEnum.instancesMap
      .get(this)
      ?.find((instance) => instance.label === label) as T | undefined;
  }

  static codes<T extends BaseEnum<string, any>>(
    this: new (...args: any[]) => T,
  ): string[] {
    return (BaseEnum.instancesMap.get(this) as T[]).map((v) => v.code);
  }

  static labels<T extends BaseEnum<string, any>>(
    this: new (...args: any[]) => T,
  ): string[] {
    return (BaseEnum.instancesMap.get(this) as T[]).map((v) => v.label);
  }
}
