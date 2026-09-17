import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Modal,
  Pressable,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import colors from '../../constants/colors';
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEK_DAYS = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

const TIMES = [
  '8:00 AM - 9:00 AM',
  '10:00 AM - 11:00 AM',
  '2:00 PM - 3:00 PM',
  '5:00 PM - 6:00 PM',
  '7:00 PM - 8:00 PM',
];

const ScheduleScreen = ({ navigation }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [isRescheduleVisible, setIsRescheduleVisible] =
    useState(false);

  const [selectedDate, setSelectedDate] = useState('');

  const [selectedTime, setSelectedTime] = useState('');

  const [currentMonth, setCurrentMonth] = useState(0);

  const [currentYear, setCurrentYear] = useState(2026);

  /* ================= SCHEDULE DATA ================= */

  const [schedules, setSchedules] = useState([
    {
      id: 1,
      status: 'Upcoming',
      title: 'Heart Disease Check-Up Schedule',
      doctor: 'Dr. Rico Pratama',
      specialty: 'Cardiologist',
      date: 'Monday, Jan 21',
      time: '7:00 PM - 8:00 PM',
      statusType: 'upcoming',
      image: require('../../../assets/Doctor1.jpg'),
    },

    {
      id: 2,
      status: 'Upcoming',
      title: 'Diabetes Mellitus Check-Up Schedule',
      doctor: 'Dr. Emily Parker',
      specialty: 'Internal Medicine Specialist',
      date: 'Monday, Jan 21',
      time: '9:00 AM - 10:00 AM',
      statusType: 'upcoming',
      image: require('../../../assets/Doctor2.jpg'),
    },

    {
      id: 3,
      status: 'Finished',
      title: 'Osteoporosis Check-Up Schedule',
      doctor: 'Dr. William Mitchell',
      specialty: 'Orthopedic Specialist',
      date: 'Friday, Jan 21',
      time: '10:00 AM - 11:00 AM',
      statusType: 'finished',
      image: require('../../../assets/Doctor3.png'),
    },
  ]);

  /* ================= DATE FUNCTIONS ================= */

  const formatSelectedDate = (day) => {
    const date = new Date(
      currentYear,
      currentMonth,
      day
    );

    return `${date.toLocaleDateString('en-US', {
      weekday: 'long',
    })}, ${date.toLocaleDateString('en-US', {
      month: 'short',
    })} ${day}`;
  };

  const generateCalendarDays = () => {
    const totalDays = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();

    const firstDay = new Date(
      currentYear,
      currentMonth,
      1
    ).getDay();

    return [
      ...Array(firstDay).fill(null),
      ...Array.from(
        {
          length: totalDays,
        },
        (_, i) => i + 1
      ),
    ];
  };

  const handleDateSelect = (day) => {
    if (day) {
      setSelectedDate(
        formatSelectedDate(day)
      );
    }
  };

  const changeMonth = (direction) => {
    if (direction === 'prev') {
      setCurrentMonth(
        currentMonth === 0
          ? 11
          : currentMonth - 1
      );

      if (currentMonth === 0) {
        setCurrentYear(currentYear - 1);
      }
    } else {
      setCurrentMonth(
        currentMonth === 11
          ? 0
          : currentMonth + 1
      );

      if (currentMonth === 11) {
        setCurrentYear(currentYear + 1);
      }
    }
  };

  const isSelectedDay = (day) => {
    return (
      day &&
      formatSelectedDate(day) === selectedDate
    );
  };

  /* ================= RESCHEDULE ================= */

  const handleReschedule = (item) => {
    setSelectedAppointment(item);
    setSelectedDate(item.date);
    setSelectedTime(item.time);

    const monthMatch = item.date.match(
      /([A-Z][a-z]{2})/
    );

    if (monthMatch) {
      const idx = MONTH_NAMES.findIndex(
        (month) =>
          month.startsWith(monthMatch[1])
      );

      if (idx !== -1) {
        setCurrentMonth(idx);
      }
    }

    setIsRescheduleVisible(true);
  };

  const closeRescheduleModal = () => {
    setIsRescheduleVisible(false);
    setSelectedAppointment(null);
    setSelectedDate('');
    setSelectedTime('');
  };

  const confirmReschedule = () => {
    if (
      !selectedAppointment ||
      !selectedDate ||
      !selectedTime
    ) {
      return;
    }

    setSchedules(
      schedules.map((item) =>
        item.id === selectedAppointment.id
          ? {
              ...item,
              date: selectedDate,
              time: selectedTime,
            }
          : item
      )
    );

    closeRescheduleModal();
  };

  /* ================= DATE CARD ================= */

  const formatDateCard = (dateStr) => {
    const parts = dateStr.split(', ');

    return {
      dayName: parts[0] || dateStr,
      monthDate: parts[1] || '',
    };
  };

  /* ================= VIDEO CONSULTATION ================= */

  const handleVideoConsultation = (item) => {
    navigation.navigate(
      'VideoConsultationScreen',
      {
        appointment: item,
      }
    );
  };

  /* ================= CHAT CONSULTATION ================= */

  const handleChatConsultation = (item) => {
    navigation.navigate(
      'ChatConsultationScreen',
      {
        appointment: item,
      }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* ================= HEADER ================= */}

        <View style={styles.header}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>

          <View
            style={styles.headerTextContainer}
          >
            <Text style={styles.headerTitle}>
              Let's Check your
            </Text>

            <Text style={styles.headerTitle}>
              Schedule!
            </Text>
          </View>

        </View>

        {/* ================= SCHEDULE LIST ================= */}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={
            styles.contentContainer
          }
          showsVerticalScrollIndicator={false}
        >

          {schedules.map((item) => {

            const fDate =
              formatDateCard(item.date);

            const isFinished =
              item.statusType === 'finished';

            const isUpcoming =
              item.statusType === 'upcoming';

            return (
              <View
                key={item.id}
                style={styles.scheduleSection}
              >

                {/* STATUS */}

                <View
                  style={[
                    styles.statusBadge,
                    isFinished &&
                      styles.finishedBadge,
                  ]}
                >
                  <View
                    style={[
                      styles.statusDot,
                      isFinished &&
                        styles.finishedDot,
                    ]}
                  />

                  <Text
                    style={[
                      styles.statusText,
                      isFinished &&
                        styles.finishedText,
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>

                {/* TITLE */}

                <Text
                  style={styles.scheduleTitle}
                >
                  {item.title}
                </Text>

                {/* ================= APPOINTMENT CARD ================= */}

                <View
                  style={
                    styles.appointmentCard
                  }
                >

                  {/* DOCTOR IMAGE */}

                  <Image
                    source={item.image}
                    style={styles.doctorImage}
                    resizeMode="cover"
                  />

                  {/* DOCTOR INFO */}

                  <View
                    style={styles.doctorInfo}
                  >

                    <Text
                      style={styles.doctorName}
                      numberOfLines={1}
                    >
                      {item.doctor}
                    </Text>

                    <Text
                      style={styles.specialty}
                      numberOfLines={2}
                    >
                      {item.specialty}
                    </Text>

                    {/* DATE */}

                    <View
                      style={styles.dateRow}
                    >

                      <Ionicons
                        name="calendar-outline"
                        size={13}
                        color={
                          colors.textSecondary
                        }
                      />

                      <View
                        style={
                          styles.dateTextContainer
                        }
                      >

                        <Text
                          style={styles.dayText}
                        >
                          {fDate.dayName}
                        </Text>

                        <Text
                          style={
                            styles.monthDateText
                          }
                        >
                          {fDate.monthDate}
                        </Text>

                      </View>

                    </View>

                    {/* TIME */}

                    <View
                      style={styles.timeRow}
                    >

                      <Ionicons
                        name="time-outline"
                        size={13}
                        color={colors.primary}
                      />

                      <Text
                        style={styles.timeText}
                      >
                        {item.time}
                      </Text>

                    </View>

                    {/* RESCHEDULE */}

                    {!isFinished && (
                      <TouchableOpacity
                        style={
                          styles.rescheduleButton
                        }
                        activeOpacity={0.8}
                        onPress={() =>
                          handleReschedule(item)
                        }
                      >

                        <Ionicons
                          name="calendar-outline"
                          size={14}
                          color={colors.white}
                        />

                        <Text
                          style={
                            styles.rescheduleText
                          }
                        >
                          Reschedule
                        </Text>

                      </TouchableOpacity>
                    )}

                  </View>
                </View>

                {/* =====================================================
                            CONSULTATION BUTTONS
                ===================================================== */}

                {isUpcoming && (
                  <View
                    style={
                      styles.consultationContainer
                    }
                  >

                    {/* ================= VIDEO ================= */}

                    <TouchableOpacity
                      style={styles.videoButton}
                      activeOpacity={0.85}
                      onPress={() =>
                        handleVideoConsultation(
                          item
                        )
                      }
                    >

                      <View
                        style={
                          styles.consultationIconContainer
                        }
                      >
                        <Ionicons
                          name="videocam"
                          size={22}
                          color={colors.white}
                        />
                      </View>

                      <View
                        style={
                          styles.consultationTextContainer
                        }
                      >
                        <Text
                          style={
                            styles.videoButtonText
                          }
                        >
                          Video
                        </Text>

                        <Text
                          style={
                            styles.videoSubText
                          }
                        >
                          Consultation
                        </Text>
                      </View>

                      <Ionicons
                        name="chevron-forward"
                        size={17}
                        color={colors.white}
                      />

                    </TouchableOpacity>

                    {/* ================= CHAT ================= */}

                    <TouchableOpacity
                      style={styles.chatButton}
                      activeOpacity={0.85}
                      onPress={() =>
                        handleChatConsultation(
                          item
                        )
                      }
                    >

                      <View
                        style={
                          styles.chatIconContainer
                        }
                      >
                        <Ionicons
                          name="chatbubble-ellipses"
                          size={22}
                          color={colors.primary}
                        />
                      </View>

                      <View
                        style={
                          styles.consultationTextContainer
                        }
                      >
                        <Text
                          style={
                            styles.chatButtonText
                          }
                        >
                          Chat
                        </Text>

                        <Text
                          style={
                            styles.chatSubText
                          }
                        >
                          Consultation
                        </Text>
                      </View>

                      <Ionicons
                        name="chevron-forward"
                        size={17}
                        color={colors.primary}
                      />

                    </TouchableOpacity>

                  </View>
                )}

              </View>
            );
          })}

        </ScrollView>

        {/* =========================================================
                              RESCHEDULE MODAL
        ========================================================= */}

        <Modal
          visible={isRescheduleVisible}
          transparent
          animationType="slide"
          onRequestClose={
            closeRescheduleModal
          }
        >

          <View
            style={styles.modalOverlay}
          >

            <View
              style={styles.modalContainer}
            >

              {/* MODAL HEADER */}

              <View
                style={styles.modalHeader}
              >

                <Text
                  style={styles.modalTitle}
                >
                  Reschedule Appointment
                </Text>

                <TouchableOpacity
                  onPress={
                    closeRescheduleModal
                  }
                  activeOpacity={0.8}
                  style={styles.closeButton}
                >
                  <Ionicons
                    name="close"
                    size={22}
                    color={colors.text}
                  />
                </TouchableOpacity>

              </View>

              {/* DOCTOR */}

              {selectedAppointment && (
                <View
                  style={
                    styles.modalDoctorContainer
                  }
                >

                  <Image
                    source={
                      selectedAppointment.image
                    }
                    style={
                      styles.modalDoctorImage
                    }
                    resizeMode="cover"
                  />

                  <View
                    style={
                      styles.modalDoctorInfo
                    }
                  >

                    <Text
                      style={
                        styles.modalDoctorName
                      }
                    >
                      {
                        selectedAppointment.doctor
                      }
                    </Text>

                    <Text
                      style={
                        styles.modalSpecialty
                      }
                    >
                      {
                        selectedAppointment.specialty
                      }
                    </Text>

                  </View>

                </View>
              )}

              {/* DATE LABEL */}

              <Text
                style={styles.sectionLabel}
              >
                Select Date
              </Text>

              {/* CALENDAR */}

              <View
                style={
                  styles.calendarContainer
                }
              >

                {/* CALENDAR HEADER */}

                <View
                  style={styles.calendarHeader}
                >

                  <TouchableOpacity
                    style={styles.monthArrow}
                    onPress={() =>
                      changeMonth('prev')
                    }
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="chevron-back"
                      size={20}
                      color={colors.primary}
                    />
                  </TouchableOpacity>

                  <View
                    style={
                      styles.monthTitleContainer
                    }
                  >

                    <Text
                      style={styles.monthTitle}
                    >
                      {
                        MONTH_NAMES[
                          currentMonth
                        ]
                      }
                    </Text>

                    <Text
                      style={styles.yearTitle}
                    >
                      {currentYear}
                    </Text>

                  </View>

                  <TouchableOpacity
                    style={styles.monthArrow}
                    onPress={() =>
                      changeMonth('next')
                    }
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={colors.primary}
                    />
                  </TouchableOpacity>

                </View>

                {/* WEEK DAYS */}

                <View
                  style={styles.weekDaysRow}
                >

                  {WEEK_DAYS.map((day) => (
                    <View
                      key={day}
                      style={styles.weekDay}
                    >
                      <Text
                        style={
                          styles.weekDayText
                        }
                      >
                        {day}
                      </Text>
                    </View>
                  ))}

                </View>

                {/* CALENDAR DAYS */}

                <View
                  style={styles.calendarGrid}
                >

                  {generateCalendarDays().map(
                    (day, index) => {

                      const selected =
                        isSelectedDay(day);

                      return (
                        <View
                          key={index}
                          style={
                            styles.calendarDayContainer
                          }
                        >

                          {day && (
                            <TouchableOpacity
                              style={[
                                styles.calendarDay,
                                selected &&
                                  styles.selectedCalendarDay,
                              ]}
                              onPress={() =>
                                handleDateSelect(
                                  day
                                )
                              }
                              activeOpacity={0.8}
                            >

                              <Text
                                style={[
                                  styles.calendarDayText,
                                  selected &&
                                    styles.selectedCalendarDayText,
                                ]}
                              >
                                {day}
                              </Text>

                            </TouchableOpacity>
                          )}

                        </View>
                      );
                    }
                  )}

                </View>

                {/* SELECTED DATE */}

                {selectedDate && (
                  <View
                    style={
                      styles.selectedDateInfo
                    }
                  >

                    <View
                      style={
                        styles.selectedDateIcon
                      }
                    >
                      <Ionicons
                        name="calendar"
                        size={18}
                        color={colors.primary}
                      />
                    </View>

                    <View>

                      <Text
                        style={
                          styles.selectedDateLabel
                        }
                      >
                        Selected Date
                      </Text>

                      <Text
                        style={
                          styles.selectedDateValue
                        }
                      >
                        {selectedDate}
                      </Text>

                    </View>

                  </View>
                )}

              </View>

              {/* TIME */}

              <Text
                style={styles.sectionLabel}
              >
                Select Time
              </Text>

              <View
                style={styles.timeGrid}
              >

                {TIMES.map((time) => {

                  const isSelected =
                    selectedTime === time;

                  return (
                    <TouchableOpacity
                      key={time}
                      style={[
                        styles.timeOption,
                        isSelected &&
                          styles.selectedTimeOption,
                      ]}
                      onPress={() =>
                        setSelectedTime(time)
                      }
                      activeOpacity={0.8}
                    >

                      <Ionicons
                        name="time-outline"
                        size={17}
                        color={
                          isSelected
                            ? colors.white
                            : colors.primary
                        }
                      />

                      <Text
                        style={[
                          styles.timeOptionText,
                          isSelected &&
                            styles.selectedOptionText,
                        ]}
                      >
                        {time}
                      </Text>

                    </TouchableOpacity>
                  );
                })}

              </View>

              {/* CONFIRM */}

              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  (!selectedDate ||
                    !selectedTime) &&
                    styles.disabledConfirmButton,
                ]}
                onPress={
                  confirmReschedule
                }
                disabled={
                  !selectedDate ||
                  !selectedTime
                }
                activeOpacity={0.85}
              >

                <Text
                  style={
                    styles.confirmButtonText
                  }
                >
                  Confirm Reschedule
                </Text>

              </TouchableOpacity>

              {/* CANCEL */}

              <Pressable
                onPress={
                  closeRescheduleModal
                }
                style={styles.cancelButton}
              >

                <Text
                  style={
                    styles.cancelButtonText
                  }
                >
                  Cancel
                </Text>

              </Pressable>

            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
};

export default ScheduleScreen;

/* =========================================================
                           STYLES
========================================================= */

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  /* ================= HEADER ================= */

  header: {
    height: 180,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 28,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTextContainer: {
    marginLeft: 18,
    marginTop: 3,
  },

  headerTitle: {
    color: colors.white,
    fontSize: 25,
    fontWeight: '700',
    lineHeight: 33,
  },

  /* ================= SCROLL ================= */

  scrollView: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 40,
  },

  /* ================= SCHEDULE ================= */

  scheduleSection: {
    marginBottom: 25,
  },

  statusBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 18,
    paddingHorizontal: 13,
    paddingVertical: 7,
    marginBottom: 9,
  },

  finishedBadge: {
    backgroundColor: colors.secondary,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.textSecondary,
    marginRight: 7,
  },

  finishedDot: {
    backgroundColor: colors.primary,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },

  finishedText: {
    color: colors.primary,
  },

  scheduleTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 13,
    lineHeight: 23,
  },

  /* ================= APPOINTMENT CARD ================= */

  appointmentCard: {
    minHeight: 150,
    backgroundColor: colors.white,
    borderRadius: 16,
    flexDirection: 'row',
    padding: 11,
    position: 'relative',

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,

    elevation: 2,
  },

  doctorImage: {
    width: 80,
    height: 128,
    borderRadius: 9,
  },

  doctorInfo: {
    marginLeft: 13,
    paddingTop: 5,
    flex: 1,
    paddingRight: 5,
  },

  doctorName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 5,
  },

  specialty: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
    lineHeight: 16,
    marginBottom: 9,
  },

  /* ================= DATE ================= */

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  dateTextContainer: {
    marginLeft: 5,
  },

  dayText: {
    fontSize: 9,
    color: colors.textSecondary,
    fontWeight: '500',
  },

  monthDateText: {
    fontSize: 11,
    color: colors.text,
    fontWeight: '700',
    marginTop: 1,
  },

  /* ================= TIME ================= */

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  timeText: {
    fontSize: 9,
    color: colors.primary,
    fontWeight: '700',
    marginLeft: 5,
  },

  /* ================= RESCHEDULE ================= */

  rescheduleButton: {
    width: 108,
    height: 31,
    backgroundColor: colors.black,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    flexDirection: 'row',
  },

  rescheduleText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },

  /* =========================================================
                    CONSULTATION BUTTONS
  ========================================================= */

  consultationContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 12,
    marginBottom: 5,
  },

  /* ================= VIDEO BUTTON ================= */

  videoButton: {
    flex: 1,
    minHeight: 58,
    borderRadius: 16,
    backgroundColor: colors.primary,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 10,

    marginRight: 5,

    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,

    elevation: 3,
  },

  consultationIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  consultationTextContainer: {
    flex: 1,
    marginLeft: 8,
  },

  videoButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '800',
  },

  videoSubText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '500',
    marginTop: 2,
    opacity: 0.85,
  },

  /* ================= CHAT BUTTON ================= */

  chatButton: {
    flex: 1,
    minHeight: 58,
    borderRadius: 16,

    backgroundColor: colors.secondary,

    borderWidth: 1,
    borderColor: colors.primary,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 10,

    marginLeft: 5,
  },

  chatIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  chatButtonText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },

  chatSubText: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '500',
    marginTop: 2,
    opacity: 0.75,
  },

  /* ================= MODAL ================= */

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 18,
    maxHeight: '92%',
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ================= MODAL DOCTOR ================= */

  modalDoctorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 15,
    padding: 10,
    marginBottom: 16,
  },

  modalDoctorImage: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },

  modalDoctorInfo: {
    marginLeft: 12,
    flex: 1,
  },

  modalDoctorName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },

  modalSpecialty: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  /* ================= SECTION LABEL ================= */

  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },

  /* ================= CALENDAR ================= */

  calendarContainer: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 14,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: colors.border,
  },

  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  monthArrow: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  monthTitleContainer: {
    alignItems: 'center',
  },

  monthTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },

  yearTitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },

  weekDaysRow: {
    flexDirection: 'row',
    marginBottom: 7,
  },

  weekDay: {
    width: '14.285%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  weekDayText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },

  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  calendarDayContainer: {
    width: '14.285%',
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },

  calendarDay: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedCalendarDay: {
    backgroundColor: colors.primary,
  },

  calendarDayText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },

  selectedCalendarDayText: {
    color: colors.white,
    fontWeight: '700',
  },

  /* ================= SELECTED DATE ================= */

  selectedDateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 9,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },

  selectedDateIcon: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9,
  },

  selectedDateLabel: {
    fontSize: 9,
    color: colors.textSecondary,
    fontWeight: '500',
  },

  selectedDateValue: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '700',
    marginTop: 2,
  },

  /* ================= TIME OPTIONS ================= */

  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },

  timeOption: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginRight: 7,
    marginBottom: 7,
    backgroundColor: colors.white,
  },

  selectedTimeOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  timeOptionText: {
    fontSize: 10,
    color: colors.text,
    marginLeft: 5,
    fontWeight: '600',
  },

  selectedOptionText: {
    color: colors.white,
  },

  /* ================= CONFIRM ================= */

  confirmButton: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  disabledConfirmButton: {
    backgroundColor: colors.border,
  },

  confirmButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },

  /* ================= CANCEL ================= */

  cancelButton: {
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },

});

