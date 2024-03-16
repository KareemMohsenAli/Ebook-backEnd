import schedule from 'node-schedule';
import userModel from '../../DB/models/user.model.js';
import sendEmail from './email.js';

export const checkDatabaseAndSendWarningEmail = () => {
  const reminderJob = schedule.scheduleJob('* 21 * * *', async function() {
      // Check Database for users who haven't confirmed their emails
      const users = await userModel.find({ confirmEmail: false });
       
      // Send reminder email to each user
      const html = "Please confirm your email to avoid account deletion.";
      for (const user of users) {
        await sendEmail({ to: user.email, subject: "Confirmation Email Reminder", html });
      }

  });
  console.log("Reminder job scheduled at 9:00 PM every day.");
};

// export const checkDatabaseAndSendWarningEmail = () => {
//   const reminderJob = schedule.scheduleJob('* 21 * * *', async function() {
//       // Set a threshold for reminder (e.g., 30 minutes before expiration)
//       const reminderThreshold = new Date(Date.now() + 30*60*1000);

//       // Check Database for users who haven't confirmed their emails and are close to expiration
//       const users = await userModel.find({
//         status: 'Pending',
//         confirmationExpires: { $lte: reminderThreshold }
//       });
       
//       // Send reminder email to each user
//       const html = "Please confirm your email to avoid account deletion. Your confirmation link will expire soon.";
//       for (const user of users) {
//         await sendEmail({ to: user.email, subject: "Confirmation Email Reminder", html });
//       }

//   });
//   console.log("Reminder job scheduled at 9:00 PM every day.");
// };