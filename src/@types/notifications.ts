export type NotificationType = 
  | "PRICE_UP" 
  | "PRICE_DOWN" 
  | "STOP_LOSS" 
  | "VOLUME_CHANGE" 
  | "SYSTEM" 
  | "SUBSCRIPTION";

export type NotificationStatus = 
  | "PENDING" 
  | "SENT" 
  | "FAILED";

export interface NotificationItem {
  _id: string;
  userId: string;
  tokenAddress?: string;
  notificationType: NotificationType;
  message: string;
  status: NotificationStatus;
  createdAt: number;
  sentAt?: number;
  readAt?: number;
  metadata?: Record<string, any>;
  __v?: number;
  updatedAt?: number;
  createdAtDate?: string; 
  updatedAtDate?: string;
}