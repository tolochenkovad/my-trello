import { Tag } from '@/store/tasks/types';

export function getTagsByIds(allTags: Tag[], tagIds: string[]): Tag[] | [] {
  return allTags.reduce<Tag[]>((acc, tag) => {
    if (tagIds.includes(tag.id)) {
      return [...acc, tag];
    }
    return acc;
  }, []);
}
