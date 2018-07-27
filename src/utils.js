export const isKeyValueObject = obj =>
  typeof obj === "object" && "key" in obj && "value" in obj;
