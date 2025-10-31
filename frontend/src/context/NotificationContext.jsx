import { createContext, useState, useCallback } from 'react';

export const NotificationContext = createContext();

let notificationId = 0;

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // Add a notification
  const addNotification = useCallback((message, type = 'info', duration = 5000) => {
    const id = notificationId++;
    const notification = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
      timestamp: Date.now(),
    };

    setNotifications((prev) => [...prev, notification]);

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  }, []);

  // Remove a notification
  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Clear all notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Success notification
  const success = useCallback(
    (message, duration) => {
      return addNotification(message, 'success', duration);
    },
    [addNotification]
  );

  // Error notification
  const error = useCallback(
    (message, duration) => {
      return addNotification(message, 'error', duration);
    },
    [addNotification]
  );

  // Warning notification
  const warning = useCallback(
    (message, duration) => {
      return addNotification(message, 'warning', duration);
    },
    [addNotification]
  );

  // Info notification
  const info = useCallback(
    (message, duration) => {
      return addNotification(message, 'info', duration);
    },
    [addNotification]
  );

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    success,
    error,
    warning,
    info,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}
