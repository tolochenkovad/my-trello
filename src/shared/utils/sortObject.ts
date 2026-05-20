import { reduce } from 'lodash';

export function sortObjectByKey(object: object, key: string) {
  return reduce(
    object,
    (acc, objectItem, keyForItem) => {
      if (keyForItem !== key) {
        return { ...acc, [keyForItem]: objectItem };
      }
      return acc;
    },
    {},
  );
}
