import { StyleSheet, Dimensions } from 'react-native';

const CIRCLE_SIZE = 170;
const BORDER_THICKNESS = 14;
const OUTER_SIZE = CIRCLE_SIZE + BORDER_THICKNESS * 2;

export const styles = StyleSheet.create({
  headerContainer: {
    height: 280,
    backgroundColor: '#0066FE',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 68,
    paddingHorizontal: 20,
    overflow: 'visible',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 33,
    letterSpacing: -0.3,
    zIndex: 10,
  },
  leftLobe: {
    position: 'absolute',
    bottom: -24,
    left: -20,
    width: 130,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0066FE',
  },
  rightLobe: {
    position: 'absolute',
    bottom: -24,
    right: -20,
    width: 130,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0066FE',
  },
  outerCircle: {
    position: 'absolute',
    bottom: -80,
    alignSelf: 'center',
    width: OUTER_SIZE,
    height: OUTER_SIZE,
    borderRadius: OUTER_SIZE / 2,
    backgroundColor: '#0066FE',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  innerWhiteCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photoPlaceholder: {
    width: 110,
    height: 130,
    backgroundColor: '#D1D5DB',
    borderRadius: 14,
    marginTop: 18,
  },
});
