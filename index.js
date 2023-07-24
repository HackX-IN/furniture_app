// Import necessary modules
import { registerRootComponent } from 'expo';
import App from './App'; // Import the root component of your application
import messaging from '@react-native-firebase/messaging';

// Set up the background message handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });


// Register the root component to be rendered in the application
registerRootComponent(App);


