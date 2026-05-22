import { Tag } from '@/store/tasks/types';
import { get } from 'lodash';

export function getNormalizedTags(data: Tag[], options: Tag[]): Tag[] {
  return data.map((item, index) => ({
    value: item.value,
    label: item.label || item.value,
    id: get(options, `${index}.id`, `tag-${item.value}-${index}`),
  }));
}

export function getTagsByIds(allTags: Tag[], tagIds: string[]): Tag[] | [] {
  return allTags.reduce<Tag[]>((acc, tag) => {
    if (tagIds.includes(tag.id)) {
      return [...acc, tag];
    }
    return acc;
  }, []);
}
