import { Tag, TaskItem } from '@/store/tasks/types';
import { TaskDeadlineStatus } from './const';
import { TaskDeadlineStatusUI } from './types';
import { normalize } from '@/shared/utils';

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

function filterByTagIds(originalTasks: TaskItem[], activeTagIds: string[]): TaskItem[] {
  return originalTasks.filter(({ tagIds = [] }) => {
    if (activeTagIds.every((tagId) => tagIds.includes(tagId))) {
      return true;
    }
    return false;
  });
}

function search(originalTasks: TaskItem[], searchValue: string): TaskItem[] {
  return originalTasks.filter(({ content }) => {
    if (normalize(content).includes(normalize(searchValue))) {
      return true;
    }
    return false;
  });
}

export function filterTasks(originalTasks: TaskItem[], activeTagIds: string[], searchValue: string): TaskItem[] {
  if (!activeTagIds.length && !searchValue.length) {
    return originalTasks;
  }
  let resultTasks = [...originalTasks];
  if (activeTagIds.length) {
    resultTasks = filterByTagIds(resultTasks, activeTagIds);
  }
  if (searchValue.length) {
    resultTasks = search(resultTasks, searchValue);
  }
  return resultTasks;
}
