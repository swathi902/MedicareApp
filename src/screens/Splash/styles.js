import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    width: 46,
    height: 46,
    marginRight: 4,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#0066FF',
    letterSpacing: -0.5,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
