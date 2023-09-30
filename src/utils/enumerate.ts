export function enumerate<T>(EnumDefinition: T) {
  try {
    return Object.values(EnumDefinition);
  } catch (e) {
    return [];
  }
}
