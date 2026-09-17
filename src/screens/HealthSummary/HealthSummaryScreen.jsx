import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';
import BottomNavigation from '../../components/BottomNavigation';

import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';

const HealthSummaryScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F4F5F7"
      />

      {/* ================= HEADER ================= */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Health Summary</Text>

        <TouchableOpacity
          style={styles.notificationButton}
          activeOpacity={0.8}
        >
          <Ionicons
            name="notifications"
            size={20}
            color="#0066FF"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= SEARCH BAR ================= */}
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <Ionicons
              name="search"
              size={18}
              color="#A0A0A0"
              style={styles.searchIcon}
            />

            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#A0A0A0"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <TouchableOpacity
            style={styles.filterButton}
            activeOpacity={0.8}
          >
            <Ionicons
              name="options-outline"
              size={20}
              color="#555555"
            />
          </TouchableOpacity>
        </View>

        {/* ================= DOCTOR PROFILE CARD ================= */}
        <View style={styles.profileCard}>
          <Image
            source={require('../../../assets/Doctor1.jpg')}
            style={styles.doctorImage}
          />

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              Dr. Mia Collins
            </Text>

            <Text style={styles.profileDetails}>
              Cardiologist
            </Text>
          </View>

          <TouchableOpacity
            style={styles.consultButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('ScheduleScreen')}
          >
            <Text style={styles.consultButtonText}>
              Consult
            </Text>
          </TouchableOpacity>
        </View>

        {/* ================= CATEGORY ICONS ================= */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          <TouchableOpacity
            style={[
              styles.categoryIconBox,
              styles.activeCategoryBox,
            ]}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="heart-pulse"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryIconBox}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="lungs"
              size={24}
              color="#8E8E93"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryIconBox}
            activeOpacity={0.8}
          >
            <FontAwesome5
              name="bone"
              size={20}
              color="#8E8E93"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryIconBox}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="tooth"
              size={24}
              color="#8E8E93"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryIconBox}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="brain"
              size={24}
              color="#8E8E93"
            />
          </TouchableOpacity>
        </ScrollView>

        {/* ================= SECTION TITLE ================= */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Heart Condition
          </Text>

          <TouchableOpacity>
            <Text style={styles.seeMoreText}>
              See More
            </Text>
          </TouchableOpacity>
        </View>

        {/* ================= CARDS SECTION ================= */}
        <View style={styles.cardsRow}>
          {/* LEFT LARGE CARD */}
          <View style={styles.leftCard}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.smallIconCircle}>
                <Ionicons
                  name="heart"
                  size={14}
                  color="#999999"
                />
              </View>

              <Text style={styles.cardSubtitle}>
                Heartbeat
              </Text>
            </View>

            <Text style={styles.cardMainValue}>
              112 Bpm
            </Text>

            <View style={styles.pulseContainer}>
              <View style={styles.pulseRingOuter}>
                <View style={styles.pulseRingMiddle}>
                  <View style={styles.pulseRingInner}>
                    <Ionicons
                      name="heart"
                      size={22}
                      color="#FFFFFF"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* RIGHT COLUMN */}
          <View style={styles.rightColumn}>
            {/* BLOOD COUNT CARD */}
            <View style={styles.rightTopCard}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.smallIconCircle}>
                  <Ionicons
                    name="bar-chart"
                    size={14}
                    color="#999999"
                  />
                </View>

                <Text style={styles.cardSubtitle}>
                  Blood Count
                </Text>
              </View>

              <Text style={styles.cardMainValueSmall}>
                80-90
              </Text>

              <View style={styles.graphMockContainer}>
                <View style={styles.waveLine} />
                <View style={styles.graphDot} />

                <View style={styles.graphValueBadge}>
                  <Text style={styles.graphValueText}>
                    80
                  </Text>

                  <Text style={styles.graphSubValueText}>
                    /90
                  </Text>
                </View>
              </View>
            </View>

            {/* BLOOD STATUS CARD */}
            <View style={styles.rightBottomCard}>
              <View style={styles.bloodStatusHeader}>
                <View style={styles.blueDropBox}>
                  <Ionicons
                    name="water"
                    size={14}
                    color="#FFFFFF"
                  />
                </View>

                <Text style={styles.cardSubtitle}>
                  Blood Status
                </Text>
              </View>

              <Text style={styles.cardMainValueSmall}>
                112/70
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
      <BottomNavigation
        navigation={navigation}
        activeScreen="HealthSummaryScreen"
      />
    </SafeAreaView>
  );
};

export default HealthSummaryScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 80,
    paddingTop: 40,
    paddingBottom: 12,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
  },

  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    height: 50,
    paddingHorizontal: 16,
    elevation: 2,
  },

  searchIcon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
  },

  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    elevation: 2,
  },

  /* ================= DOCTOR PROFILE ================= */

  profileCard: {
    backgroundColor: '#0066FF',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    height: 110,
  },

  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },

  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },

  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  profileDetails: {
    fontSize: 13,
    color: '#E0EEFF',
    marginTop: 4,
  },

  consultButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  consultButtonText: {
    color: '#0066FF',
    fontWeight: '600',
    fontSize: 14,
  },

  /* ================= CATEGORIES ================= */

  categoriesContainer: {
    flexDirection: 'row',
    marginTop: 24,
    paddingVertical: 4,
  },

  categoryIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    elevation: 2,
  },

  activeCategoryBox: {
    backgroundColor: '#0066FF',
  },

  /* ================= SECTION ================= */

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },

  seeMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0066FF',
  },

  /* ================= CARDS ================= */

  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  leftCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    height: 320,
    justifyContent: 'space-between',
    elevation: 2,
  },

  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  smallIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '500',
  },

  cardMainValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginTop: 4,
  },

  cardMainValueSmall: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginTop: 4,
  },

  pulseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },

  pulseRingOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(0, 102, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pulseRingMiddle: {
    width: 105,
    height: 105,
    borderRadius: 52.5,
    backgroundColor: 'rgba(0, 102, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pulseRingInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  rightColumn: {
    width: '48%',
    justifyContent: 'space-between',
  },

  rightTopCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    height: 180,
    elevation: 2,
  },

  graphMockContainer: {
    height: 60,
    marginTop: 10,
    position: 'relative',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    overflow: 'hidden',
  },

  waveLine: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    height: 20,
    borderTopWidth: 2,
    borderColor: '#0066FF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  graphDot: {
    position: 'absolute',
    top: 15,
    right: 40,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0066FF',
  },

  graphValueBadge: {
    position: 'absolute',
    right: 10,
    bottom: 8,
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  graphValueText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },

  graphSubValueText: {
    fontSize: 10,
    color: '#8E8E93',
  },

  rightBottomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    height: 124,
    elevation: 2,
  },

  bloodStatusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  blueDropBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});