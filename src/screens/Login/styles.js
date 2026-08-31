import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#DEE5FF',
  },

  scrollContent: {
    paddingBottom: 40,
    flexGrow: 1,
  },

  imageContainer: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginTop: -15,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  headerImage: {
    width: '100%',
    height: '100%',
  },

  form: {
    marginTop: 20,
    paddingHorizontal: 22,
    flex: 1,
  },

  primaryBtn: {
    backgroundColor: '#0066FE',
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,

    shadowColor: '#0066FE',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },

  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    paddingBottom: 16,
  },

  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  footerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0066FE',
  },

  // =========================
  // Custom Popup Styles
  // =========================

  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  popupContainer: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',

    elevation: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  popupTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },

  popupMessage: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748B',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 22,
  },

  popupButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#0066FE',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  popupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

});
