import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export async function registerForPushNotificationsAsync() {
    try {
        console.log('🚀 Starting push notification registration...');

        console.log('📱 Device.isDevice:', Device.isDevice);
        console.log('📱 Device.modelName:', Device.modelName);

        // Get notification permission
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } =
                await Notifications.requestPermissionsAsync();

            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.log('❌ Notification permission denied');
            return null;
        }

        console.log('✅ Notification permission granted');

        // Android notification channel
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
            });

            console.log('✅ Android notification channel created');
        }

        // EAS Project ID
        const projectId =
            Constants.expoConfig?.extra?.eas?.projectId ??
            Constants.easConfig?.projectId;

        console.log('📦 EAS Project ID:', projectId);

        if (!projectId) {
            console.log('❌ EAS projectId not found');
            return null;
        }

        // Generate Expo Push Token
        const tokenResponse =
            await Notifications.getExpoPushTokenAsync({
                projectId,
            });

        console.log('📩 Token Response:', tokenResponse);

        const token = tokenResponse.data;

        console.log('✅ EXPO PUSH TOKEN:', token);

        return token;

    } catch (error) {
        console.log('❌ PUSH NOTIFICATION ERROR:', error);
        return null;
    }
}