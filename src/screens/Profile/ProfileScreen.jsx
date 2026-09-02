import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MobileStatusBar from '../../components/MobileStatusBar';
import colors from '../../constants/colors';

export default function ProfileScreen({ navigation }) {
    const menuItems = [
        { icon: 'person-outline', title: 'Edit Profile', action: () => Alert.alert('Edit Profile', 'Edit profile feature coming soon!') },
        { icon: 'calendar-outline', title: 'My Appointments', action: () => Alert.alert('My Appointments', 'You have no active appointments.') },
        { icon: 'heart-outline', title: 'Favorite Doctors', action: () => Alert.alert('Favorite Doctors', 'No favorite doctors added yet.') },
        { icon: 'settings-outline', title: 'Settings', action: () => Alert.alert('Settings', 'App settings panel coming soon!') },
        { icon: 'help-circle-outline', title: 'Help & Support', action: () => Alert.alert('Support', 'Contact us at support@example.com') },
    ];

    return (
        <View style={styles.container}>
            <MobileStatusBar />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Profile</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* User Info Card */}
                <View style={styles.profileCard}>
                    <Image
                        source={require('../../../assets/Doctor1.jpg')}
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                    <Text style={styles.userName}>Mia Collins</Text>
                    <Text style={styles.userEmail}>mia.collins@example.com</Text>
                </View>

                {/* Menu List */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={styles.menuItem} 
                            activeOpacity={0.7}
                            onPress={item.action}
                        >
                            <View style={styles.menuLeft}>
                                <Ionicons name={item.icon} size={20} color={colors.primary} />
                                <Text style={styles.menuText}>{item.title}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
                        </TouchableOpacity>
                    ))}

                    {/* Logout Button */}
                    <TouchableOpacity
                        style={[styles.menuItem, { borderBottomWidth: 0, marginTop: 10 }]}
                        onPress={() => {
                            // Simple logout confirmation alert before navigating to Login
                            Alert.alert(
                                "Logout",
                                "Are you sure you want to logout?",
                                [
                                    { text: "Cancel", style: "cancel" },
                                    { text: "Logout", style: "destructive", onPress: () => navigation.navigate('Login') }
                                ]
                            );
                        }}
                        activeOpacity={0.7}
                    >
                        <View style={styles.menuLeft}>
                            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
                            <Text style={[styles.menuText, { color: '#EF4444' }]}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Floating Bottom Navigation Bar */}
            <View style={styles.bottomNavContainer}>
                <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.navIconInactive} activeOpacity={0.8} onPress={() => navigation.navigate('Home')}>
                        <Ionicons name="home" size={20} color={colors.placeholder} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navIconInactive} activeOpacity={0.8} onPress={() => navigation.navigate('Search')}>
                        <Ionicons name="search" size={20} color={colors.placeholder} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navIconActive} activeOpacity={0.8} onPress={() => navigation.navigate('Profile')}>
                        <Ionicons name="person" size={20} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.surface },
    header: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 10, alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
    scrollContent: { paddingHorizontal: 20, paddingTop: 10 },
    profileCard: { backgroundColor: colors.white, borderRadius: 20, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: colors.border, marginBottom: 20 },
    avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 12, borderWidth: 2, borderColor: colors.primary },
    userName: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 4 },
    userEmail: { fontSize: 13, color: colors.textSecondary },
    menuContainer: { backgroundColor: colors.white, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: colors.border },
    menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
    menuLeft: { flexDirection: 'row', alignItems: 'center' },
    menuText: { fontSize: 14, fontWeight: '600', color: colors.text, marginLeft: 12 },
    bottomNavContainer: { position: 'absolute', bottom: 75, left: 0, right: 0, alignItems: 'center' },
    bottomNav: { backgroundColor: '#1E293B', flexDirection: 'row', borderRadius: 35, paddingHorizontal: 6, paddingVertical: 6, alignItems: 'center', elevation: 10 },
    navIconActive: { width: 46, height: 46, borderRadius: 23, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginHorizontal: 4 },
    navIconInactive: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', marginHorizontal: 4 },
});