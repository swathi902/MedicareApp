import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MobileStatusBar from '../../components/MobileStatusBar';
import BottomNavigation from '../../components/BottomNavigation';
import SearchBar from '../../components/SearchBar';
import colors from '../../constants/colors';

export default function HomeScreen({ navigation }) {
  const [selectedDay, setSelectedDay] = useState(15);
  const [searchQuery, setSearchQuery] = useState('');

  const daysList = [
    { day: 'Mon', date: 11 },
    { day: 'Tue', date: 12 },
    { day: 'Wed', date: 13 },
    { day: 'Thu', date: 14 },
    { day: 'Fri', date: 15 },
    { day: 'Sat', date: 16 },
    { day: 'Sun', date: 17 },
  ];

  return (
    <View style={styles.container}>
      <MobileStatusBar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileInfoRow}>
            <Image
              source={require('../../../assets/Doctor1.jpg')}
              style={styles.userAvatar}
              resizeMode="cover"
            />
            <View style={styles.userTextContainer}>
              <Text style={styles.userName}>Mia Collins</Text>
              <Text style={styles.userSubText}>Female, 22 y.o</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.filterIconButton} activeOpacity={0.7}>
            <Ionicons name="options-outline" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Top Doctors Section Title */}
        <Text style={styles.sectionTitle}>Top Doctors</Text>

        {/* Featured Doctor Banner Card */}
        <View style={styles.featuredCard}>
          <View style={styles.cardTopRow}>
            <View>
              <Text style={styles.specialtyLabel}>Neurologist</Text>
              <Text style={styles.doctorName}>Dr. Jessica</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color={colors.warning} />
                <Text style={styles.ratingText}> 4.9 <Text style={styles.reviewsText}>(3,988)</Text></Text>
              </View>
              <Text style={styles.feeText}>75$/Session</Text>
            </View>

            <View style={styles.doctorImageWrapper}>
              <Image
                source={require('../../../assets/Doctor2.jpg')}
                style={styles.doctorCardImage}
                resizeMode="cover"
              />
              <TouchableOpacity style={styles.heartButton} activeOpacity={0.8}>
                <Ionicons name="heart" size={15} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.consultBtn} activeOpacity={0.85}>
            <Text style={styles.consultBtnText}>Consult Now</Text>
          </TouchableOpacity>

          {/* Availability Calendar Header */}
          <View style={styles.calendarHeaderRow}>
            <Text style={styles.availabilityLabel}>Availability</Text>
            <View style={styles.monthSelector}>
              <Text style={styles.monthText}>September 2026</Text>
              <Ionicons name="chevron-forward" size={13} color="#E2E8F0" />
            </View>
          </View>

          {/* Horizontal Days Bar */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysScroll}>
            {daysList.map((item, index) => {
              const isSelected = selectedDay === item.date;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.dayItem, isSelected && styles.selectedDayItem]}
                  onPress={() => setSelectedDay(item.date)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.dayNameText, isSelected && styles.selectedText]}>{item.day}</Text>
                  <Text style={[styles.dayDateText, isSelected && styles.selectedText]}>{item.date}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Reusable Search Bar Component */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search"
        />

        {/* Available Doctors Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Available Doctors</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Doctor List Card */}
        <View style={styles.availableDoctorCard}>
          <Image
            source={require('../../../assets/Doctor3.png')}
            style={styles.availableDocImage}
            resizeMode="cover"
          />
          <View style={styles.availableDocInfo}>
            <Text style={styles.availableDocName}>Dr. Rico</Text>
            <Text style={styles.availableDocSub}>3 years experienced</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={13} color={colors.warning} />
              <Text style={styles.availableRatingText}> 4.9 <Text style={styles.availableReviewsText}>(3,988)</Text></Text>
            </View>
          </View>
        </View>

        {/* Checkup Schedule Section */}
        <View style={[styles.sectionHeaderRow, { marginTop: 20 }]}>
          <Text style={styles.sectionTitle}>Checkup Schedule</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.scheduleCard}>
          <View style={styles.scheduleHeader}>
            <View style={styles.scheduleDocInfo}>
              <Image
                source={require('../../../assets/Doctor4.png')}
                style={styles.scheduleAvatar}
                resizeMode="cover"
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.scheduleDocName}>Dr. Jessica</Text>
                <Text style={styles.scheduleDocSpec}>Neurologist</Text>
              </View>
            </View>
            <View style={styles.videoIconContainer}>
              <Ionicons name="videocam" size={18} color={colors.primary} />
            </View>
          </View>
          <View style={styles.scheduleTimeRow}>
            <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.scheduleTimeText}> Wednesday, Jan 13 | 10:00 AM</Text>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Reusable Bottom Navigation Component */}
      <BottomNavigation
        navigation={navigation}
        activeScreen="Home"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 50, 
    paddingBottom: 40,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.primary,
  },
  userTextContainer: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  userSubText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  filterIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  featuredCard: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 18,
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  specialtyLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.secondary,
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
  reviewsText: {
    color: colors.secondary,
    fontWeight: '400',
    fontSize: 12,
  },
  feeText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
    marginTop: 4,
  },
  doctorImageWrapper: {
    width: 85,
    height: 85,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.white,
    position: 'relative',
  },
  doctorCardImage: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: colors.white,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  consultBtn: {
    backgroundColor: colors.white,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  consultBtnText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  calendarHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  availabilityLabel: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  daysScroll: {
    paddingVertical: 4,
  },
  dayItem: {
    width: 42,
    height: 60,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  selectedDayItem: {
    backgroundColor: colors.white,
  },
  dayNameText: {
    fontSize: 11,
    color: '#E2E8F0',
    fontWeight: '600',
    marginBottom: 4,
  },
  dayDateText: {
    fontSize: 13,
    color: colors.white,
    fontWeight: '700',
  },
  selectedText: {
    color: colors.primary,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  availableDoctorCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  availableDocImage: {
    width: 60,
    height: 60,
    borderRadius: 14,
  },
  availableDocInfo: {
    marginLeft: 12,
    flex: 1,
  },
  availableDocName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  availableDocSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  availableRatingText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  availableReviewsText: {
    color: colors.textSecondary,
    fontWeight: '400',
    fontSize: 12,
  },
  scheduleCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  scheduleDocInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
  },
  scheduleDocName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  scheduleDocSpec: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  videoIconContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 10,
  },
  scheduleTimeText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});