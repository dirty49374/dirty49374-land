
export function mongoFixIds<T>(list: T[]): T[] {
  list.forEach((p: any) => p.id = p._id.toString());
  return list;
}

export function mongoFixId<T>(v: T): T {
  (v as any).id = (v as any)._id.toString();
  return v;
}

