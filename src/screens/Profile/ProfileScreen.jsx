import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import MobileStatusBar from '../../components/MobileStatusBar';
import BottomNavigation from '../../components/BottomNavigation';
import CustomModal from '../../components/CustomModal';
import colors from '../../constants/colors';

export default function ProfileScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);


  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    type: 'info',
  });

  const [name, setName] = useState('Mia Collins');
  const [email, setEmail] = useState('mia.collins@example.com');

  const openPopup = (title, message, type = 'info') => {
    setModalConfig({
      title,
      message,
      type,
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLogout = () => {
    setModalVisible(false);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <MobileStatusBar />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={require('../../../assets/Doctor1.jpg')}
            style={styles.avatar}
          />
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>

        {/* Menu Container */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => openPopup('Edit Profile', 'Update your personal details below.', 'edit')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="person-outline" size={20} color={colors.primary} />
              <Text style={styles.menuText}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => openPopup('My Appointments', 'You currently have no active appointments scheduled.')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="calendar-outline" size={20} color={colors.primary} />
              <Text style={styles.menuText}>My Appointments</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => openPopup('Favorite Doctors', 'You have not added any favorite doctors to your list yet.')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="heart-outline" size={20} color={colors.primary} />
              <Text style={styles.menuText}>Favorite Doctors</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => openPopup('Settings', 'App preferences and notification settings panel will appear here.')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="settings-outline" size={20} color={colors.primary} />
              <Text style={styles.menuText}>Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => openPopup('Help & Support', 'Need assistance? Reach out to our 24/7 team at support@example.com')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="help-circle-outline" size={20} color={colors.primary} />
              <Text style={styles.menuText}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={() => openPopup('Logout', 'Are you sure you want to logout from your account?', 'logout')}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Custom Modal with Safe Config Checking */}
      <CustomModal
        visible={modalVisible}
        config={modalConfig}
        name={name}
        email={email}
        setName={setName}
        setEmail={setEmail}
        onClose={closeModal}
        onLogout={handleLogout}
      />

      {/* Bottom Navigation */}
      <BottomNavigation
        navigation={navigation}
        activeScreen="Profile"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  menuContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
  },
  logoutItem: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
  logoutText: {
    color: '#EF4444',
  },
});