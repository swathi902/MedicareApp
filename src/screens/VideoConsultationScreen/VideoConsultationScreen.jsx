import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import colors from '../../constants/colors';

const VideoConsultationScreen = ({ navigation, route }) => {
  /* =========================================================
                        APPOINTMENT DATA
  ========================================================= */

  const appointment = route?.params?.appointment;

  /* =========================================================
                        STATES
  ========================================================= */

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);

  /* =========================================================
                        DOCTOR DATA
  ========================================================= */

  const doctorName =
    appointment?.doctor || 'Dr. Kevin Obama';

  const specialty =
    appointment?.specialty || 'Radiology';

  const doctorImage =
    appointment?.image || require('../../../assets/Doctor1.jpg');

  /* =========================================================
                        END CONSULTATION
  ========================================================= */

  const handleEndConsultation = () => {
    Alert.alert(
      'End Consultation',
      'Are you sure you want to end this consultation?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'End',
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          },
        },
      ],
    );
  };

  /* =========================================================
                        MAIN UI
  ========================================================= */

  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.container}>

        {/* =====================================================
                            FULLSCREEN VIDEO AREA
        ===================================================== */}

        <View style={styles.videoContainer}>

          {/* DOCTOR IMAGE BACKGROUND */}

          <Image
            source={doctorImage}
            style={styles.doctorVideo}
            resizeMode="cover"
          />

          {/* LIGHT / DARK OVERLAY */}

          <View style={styles.videoOverlay} />

          {/* =================================================
                            TOP HEADER
          ================================================= */}

          <View style={styles.topHeader}>

            {/* BACK BUTTON */}

            <TouchableOpacity
              style={styles.topButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <Ionicons
                name="chevron-back"
                size={22}
                color={colors.primary || '#007AFF'}
              />
            </TouchableOpacity>

            {/* TIMER / RECORDING PILL */}

            <View style={styles.timerPill}>
              <View style={styles.redDot} />
              <Text style={styles.timerText}>10:15:33</Text>
            </View>

            {/* MORE OPTIONS BUTTON */}

            <TouchableOpacity
              style={styles.topButton}
              activeOpacity={0.8}
            >
              <Ionicons
                name="ellipsis-vertical"
                size={20}
                color={colors.primary || '#007AFF'}
              />
            </TouchableOpacity>

          </View>

          {/* =================================================
                        PATIENT PREVIEW CARD (TOP RIGHT)
          ================================================= */}

          <View style={styles.patientVideoContainer}>
            {cameraOn ? (
              <View style={styles.patientPlaceholder}>
                <Ionicons
                  name="person"
                  size={32}
                  color="#999"
                />
              </View>
            ) : (
              <View style={styles.cameraOffContainer}>
                <Ionicons
                  name="videocam-off"
                  size={24}
                  color="#fff"
                />
              </View>
            )}
          </View>

          {/* =================================================
                        MIDDLE ACTION BUTTONS ROW
          ================================================= */}

          <View style={styles.middleControlsRow}>

            {/* RED HANGUP BUTTON */}
            <TouchableOpacity
              style={[styles.actionButton, styles.redButton]}
              onPress={handleEndConsultation}
              activeOpacity={0.85}
            >
              <Ionicons
                name="call"
                size={22}
                color="#fff"
                style={{ transform: [{ rotate: '135deg' }] }}
              />
            </TouchableOpacity>

            {/* SPEAKER BUTTON */}
            <TouchableOpacity
              style={[
                styles.actionButton, 
                styles.greyButton,
                !speakerOn && styles.buttonOff
              ]}
              onPress={() => setSpeakerOn(!speakerOn)}
              activeOpacity={0.85}
            >
              <Ionicons
                name={speakerOn ? "volume-high" : "volume-mute"}
                size={22}
                color="#fff"
              />
            </TouchableOpacity>

            {/* CHAT BUTTON */}
            <TouchableOpacity
              style={[styles.actionButton, styles.greyButton]}
              onPress={() =>
                navigation.navigate('ChatConsultation', { appointment })
              }
              activeOpacity={0.85}
            >
              <Ionicons
                name="chatbubble"
                size={20}
                color="#fff"
              />
            </TouchableOpacity>

            {/* PARTICIPANTS / MORE BUTTON */}
            <TouchableOpacity
              style={[styles.actionButton, styles.greyButton]}
              activeOpacity={0.85}
            >
              <Ionicons
                name="people"
                size={22}
                color="#fff"
              />
            </TouchableOpacity>

          </View>

        </View>

        {/* =====================================================
                        BOTTOM DOCTOR INFO SHEET
        ===================================================== */}

        <View style={styles.bottomSheet}>

          {/* HANDLE BAR */}
          <View style={styles.handleBar} />

          <View style={styles.bottomDoctorContent}>
            <Image
              source={doctorImage}
              style={styles.bottomDoctorImage}
              resizeMode="cover"
            />

            <View style={styles.bottomDoctorText}>
              <Text style={styles.bottomDoctorName}>
                {doctorName}
              </Text>
              <Text style={styles.bottomDoctorSpecialty}>
                {specialty}
              </Text>
            </View>
          </View>

        </View>

      </View>

    </SafeAreaView>
  );
};

export default VideoConsultationScreen;

/* =========================================================
                            STYLES
========================================================= */

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },

  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },

  videoContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#E5E5E5',
  },

  doctorVideo: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },

  /* TOP HEADER */
  topHeader: {
    position: 'absolute',
    top: 15,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },

  topButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },

  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 50,
    paddingVertical: 6,
    borderRadius: 20,
  },

  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    marginRight: 6,
  },

  timerText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  /* PATIENT PREVIEW CARD */
  patientVideoContainer: {
    position: 'absolute',
    top: 80,
    right: 20,
    width: 95,
    height: 130,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#D1D1D6',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  patientPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
  },

  cameraOffContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },

  /* MIDDLE CONTROLS ROW */
  middleControlsRow: {
    position: 'absolute',
    bottom: 110,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  redButton: {
    backgroundColor: '#FF3B30',
  },

  greyButton: {
    backgroundColor: '#8E8E93',
  },

  buttonOff: {
    backgroundColor: '#3A3A3C',
  },

  /* BOTTOM SHEET */
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
  },

  handleBar: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#007AFF',
    alignSelf: 'center',
    marginBottom: 14,
  },

  bottomDoctorContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bottomDoctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
  },

  bottomDoctorText: {
    marginLeft: 14,
    flex: 1,
  },

  bottomDoctorName: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },

  bottomDoctorSpecialty: {
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 2,
  },

});