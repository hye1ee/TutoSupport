// services/notifications.ts
import { collection, addDoc, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

interface Notification {
  userId: string;          // User who will receive the notification
  type: 'clap';           // We can add more types later
  sourceUserId: string;    // User who performed the action (e.g., who clapped)
  contentId: string;       // ID of the comment/reply that was clapped
  contentType: 'comment' | 'reply';  // Type of content that was clapped
  timestamp: Date;
  isRead: boolean;
}

// Create a notification when someone claps
export const createClapNotification = async (
  targetUserId: string,   // User who will receive the notification
  sourceUserId: string,   // User who clapped
  contentId: string,      // Comment/reply ID
  contentType: 'comment' | 'reply'
) => {
  try {
    const notificationData: Notification = {
      userId: targetUserId,
      type: 'clap',
      sourceUserId,
      contentId,
      contentType,
      timestamp: new Date(),
      isRead: false
    };

    const notificationsRef = collection(db, 'notifications');
    await addDoc(notificationsRef, notificationData);
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

// Get notifications for a user
export const getUserNotifications = async (userId: string) => {
  try {
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting notifications:', error);
    throw error;
  }
};