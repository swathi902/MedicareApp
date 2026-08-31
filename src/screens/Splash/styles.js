import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEE5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    width: 52,
    height: 52,
    marginRight: 6,
  },
  logoText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#0066FF',
    letterSpacing: -0.8,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  tagline: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
    color: '#4B5563',
    letterSpacing: 0.2,
  },
});