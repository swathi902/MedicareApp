
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';

const ChatConsultationScreen = ({ navigation, route }) => {
  const appointment = route?.params?.appointment;

  const doctorName = appointment?.doctor || 'Dr. Kevin Obama';
  const specialty = appointment?.specialty || 'Radiology';

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'doctor',
      text: 'Our test results show slightly high cholesterol and mild hypertension.',
      time: '09:00 PM',
    },
    {
      id: '2',
      sender: 'patient',
      text: 'Is this dangerous, doctor?',
      time: '09:05 PM',
    },
    {
      id: '3',
      sender: 'doctor',
      text: 'Not too serious, but lifestyle changes are needed. Reduce salt, eat healthier, and exercise regularly.',
      time: '09:07 PM',
    },
    {
      id: '4',
      sender: 'patient',
      text: "Okay, I'll start improving my lifestyle. Do I need medication?",
      time: '09:11 PM',
    },
    {
      id: '5',
      sender: 'doctor',
      text: "Yes, I'll prescribe medication to help lower your blood pressure. Monitor regularly and come back for a check-up in 2 months.",
      time: '09:15 PM',
    },
  ]);

  // ================= DOCTOR REPLY =================

  const getDoctorReply = (userText) => {
    const text = userText.toLowerCase();

    let replyText =
      'I understand. Make sure to follow your health plan and let me know if you experience any new symptoms.';

    if (
      text.includes('diet') ||
      text.includes('food') ||
      text.includes('eat')
    ) {
      replyText =
        'Focus on a balanced diet rich in leafy greens, whole grains, and lean proteins. Try to strictly avoid oily, fried, and high-sodium foods.';
    } else if (
      text.includes('medicine') ||
      text.includes('tablet') ||
      text.includes('pill')
    ) {
      replyText =
        'Take your prescribed medication daily after meals. Do not skip doses, and check your vitals weekly.';
    } else if (
      text.includes('headache') ||
      text.includes('pain') ||
      text.includes('fever')
    ) {
      replyText =
        'If you are experiencing pain or fever, rest well and stay hydrated. If it persists for more than a day, visit the clinic immediately.';
    } else if (
      text.includes('thank') ||
      text.includes('ok') ||
      text.includes('okay')
    ) {
      replyText =
        "You're welcome! Take care of yourself, and feel free to reach out if you need anything else.";
    }

    return replyText;
  };

  // ================= SEND MESSAGE =================

  const handleSend = () => {
    if (message.trim() === '') return;

    const userQuery = message.trim();

    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newPatientMessage = {
      id: Date.now().toString(),
      sender: 'patient',
      text: userQuery,
      time: currentTime,
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      newPatientMessage,
    ]);

    setMessage('');

    setTimeout(() => {
      const newDoctorMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'doctor',
        text: getDoctorReply(userQuery),
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prevMessages) => [
        ...prevMessages,
        newDoctorMessage,
      ]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F5F5F5"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >

        {/* ================= HEADER ================= */}

        <View style={styles.header}>

          {/* BACK BUTTON */}

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

          {/* DOCTOR DETAILS */}

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>
              {doctorName}
            </Text>

            <Text style={styles.headerSubtitle}>
              {specialty}
            </Text>
          </View>

          {/* CALL BUTTON */}

          <TouchableOpacity
            style={styles.callButton}
            onPress={() => {}}
            activeOpacity={0.8}
          >
            <Ionicons
              name="call"
              size={18}
              color={colors.primary}
            />
          </TouchableOpacity>

        </View>

        {/* ================= CHAT BODY ================= */}

        <ScrollView
          style={styles.chatBody}
          contentContainerStyle={styles.chatScrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((item) => {
            const isDoctor = item.sender === 'doctor';

            return (
              <View
                key={item.id}
                style={[
                  styles.messageRow,
                  isDoctor
                    ? styles.doctorRow
                    : styles.patientRow,
                ]}
              >
                <View
                  style={[
                    styles.bubble,
                    isDoctor
                      ? styles.doctorBubble
                      : styles.patientBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      isDoctor
                        ? styles.doctorText
                        : styles.patientText,
                    ]}
                  >
                    {item.text}
                  </Text>
                </View>

                <Text style={styles.timeText}>
                  {item.time}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        {/* ================= INPUT BAR ================= */}

        <View style={styles.inputContainer}>

          <View style={styles.inputWrapper}>

            <TextInput
              style={styles.textInput}
              placeholder="Type something here..."
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              multiline={false}
              returnKeyType="send"
              onSubmitEditing={handleSend}
            />

            <TouchableOpacity
              style={styles.inputIconBtn}
              activeOpacity={0.7}
            >
              <Ionicons
                name="add"
                size={22}
                color="#8E8E93"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.inputIconBtn}
              activeOpacity={0.7}
            >
              <Ionicons
                name="happy-outline"
                size={22}
                color="#8E8E93"
              />
            </TouchableOpacity>

          </View>

          {/* SEND BUTTON */}

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSend}
            activeOpacity={0.8}
          >
            <Ionicons
              name="send"
              size={18}
              color="#FFFFFF"
            />
          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatConsultationScreen;

// ================= STYLES =================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  // ================= HEADER =================

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 80,
    paddingVertical: 40,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
  },

  headerSubtitle: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },

  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  // ================= CHAT BODY =================

  chatBody: {
    flex: 1,
  },

  chatScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },

  messageRow: {
    marginBottom: 16,
    maxWidth: '80%',
  },

  doctorRow: {
    alignSelf: 'flex-start',
  },

  patientRow: {
    alignSelf: 'flex-end',
  },

  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },

  doctorBubble: {
    backgroundColor: '#007AFF',
    borderBottomLeftRadius: 4,
  },

  patientBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: 4,
    elevation: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },

  doctorText: {
    color: '#FFFFFF',
  },

  patientText: {
    color: '#000000',
  },

  timeText: {
    fontSize: 10,
    color: '#8E8E93',
    marginTop: 4,
    marginHorizontal: 4,
  },

  // ================= INPUT BAR =================

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
  },

  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
    paddingVertical: 0,
  },

  inputIconBtn: {
    marginLeft: 8,
    padding: 4,
  },

  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});