import { Tag, TaskItem } from '@/store/tasks/types';
import { TaskDeadlineStatus } from './const';
import { TaskDeadlineStatusUI } from './types';

export function getTagsByIds(allTags: Tag[], tagIds: string[]): Tag[] | [] {
  return allTags.reduce<Tag[]>((acc, tag) => {
    if (tagIds.includes(tag.id)) {
      return [...acc, tag];
    }
    return acc;
  }, []);
}

export function getDeadlineTaskStatus(dateOfTheEnd: string): TaskDeadlineStatusUI {
  const currentDate = new Date();
  const endDate = new Date(dateOfTheEnd);
  const dayInMs = 1000 * 60 * 60 * 24;

  currentDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  const difference = (endDate.getTime() - currentDate.getTime()) / dayInMs;

  const statuses: Record<number, TaskDeadlineStatus> = {
    1: TaskDeadlineStatus.LeftOneDay,
    0: TaskDeadlineStatus.Deadline,
    [-1]: TaskDeadlineStatus.Expired,
  };

  return difference <= -1 ? TaskDeadlineStatus.Expired : statuses[difference] || null;
}

export function filterByTagIds(originalTasks: TaskItem[], activeTagIds: string[]): TaskItem[] {
  if (!activeTagIds.length) {
    return originalTasks;
  }
  const tasks = originalTasks.filter(({ tagIds = [] }) => {
    if (activeTagIds.every((tagId) => tagIds.includes(tagId))) {
      return true;
    }
    return false;
  });
  return tasks;
}
