function isObject(item: any): boolean {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function mergeDeep(target: any, source: any): any {
  if (!isObject(target) || !isObject(source)) return source;
  for (const key of Object.keys(source)) {
    if (isObject(source[key])) {
      if (!target[key]) target[key] = {};
      mergeDeep(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
