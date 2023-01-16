function cloneCleanModelByProperties<T extends Record<string, any>>(
  model: T,
  props: string[]
): T {
  const cleanedEntity = {} as Record<string, any>;

  props.forEach((prop) => {
    cleanedEntity[prop] = model[prop];
  });

  return cleanedEntity as T;
}

export default cloneCleanModelByProperties;
