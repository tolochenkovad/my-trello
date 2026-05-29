export enum TaskDeadlineStatus {
  LeftOneDay = 'leftOneDay',
  Deadline = 'deadline',
  Expired = 'expired',
}

export const TASK_DEADLINE_TRANSLATIONS = {
  [TaskDeadlineStatus.Deadline]: 'Deadline is today',
  [TaskDeadlineStatus.Expired]: 'Deadline has expired',
  [TaskDeadlineStatus.LeftOneDay]: 'Deadline is in 1 day',
};
