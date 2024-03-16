import SystemNotification from "../../DB/models/systemNotification.model.js.js";
import userModel from "../../DB/models/user.model.js";
import { sendFirebaseNotification } from "./firebaseNotification.js";
import { getIo } from "./socket.js";
export const createNotification = async (notificationData) => {
    try {
        if(notificationData.from.toString() ===notificationData.to.toString()){
            return;
        }
        const destUser=await userModel.findById(notificationData.to)
        // const checkNotificationExist=await SystemNotification.findOne(notificationData);
        // if(checkNotificationExist){
        //     return;
        // }
        const notification = await SystemNotification.create(notificationData);
        getIo().to(destUser.socketId).emit('notification', notification);
        //////firebase notification
        if (destUser?.isOnline&&destUser?.isOnline===false) {
             sendFirebaseNotification(
                destUser.fcmToken,
                'New Notification',
                notification.content
            );
        }
    } catch (error) {
        console.error('Error creating notification', error);
    }
};

