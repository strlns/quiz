export interface HasDates {
  createdAt: Date;
  updatedAt: Date;
}

export function convertViewDate<T extends HasDates>(
  arg: T
): Omit<T, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
} {
  return {
    ...arg,
    createdAt: arg.createdAt.toUTCString(),
    updatedAt: arg.updatedAt.toUTCString(),
  };
}
