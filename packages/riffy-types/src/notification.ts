export enum NotificationStatus {
  READ = 'READ',
  UNREAD = 'UNREAD',
}

export interface Notification {
  id: string;
  description: string;
  status: NotificationStatus;
  createdAt: string;
  updatedAt: string;
}
