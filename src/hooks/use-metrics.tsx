import { useWindowDimensions } from 'react-native';

function useMetrics() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const guidelineBaseWidth: number = 375;
  const guidelineBaseHeight: number = 812;

  // horizontalScale - Usage: width, marginLeft, marginRight, marginHorizontal, paddingLeft, paddingRight, paddingHorizontal
  const hs = (size: number): number =>
    (windowWidth / guidelineBaseWidth) * size;

  // verticalScale - Usage: height, marginTop, marginBottom, marginVertical, lineHeight, paddingTop, paddingBottom, paddingVertical
  const vs = (size: number): number =>
    (windowHeight / guidelineBaseHeight) * size;

  // moderateScale - Usage: fontSize, borderRadius
  const ms = (size: number, factor: number = 0.5): number =>
    size + (hs(size) - size) * factor;

  return {
    windowWidth,
    windowHeight,
    hs,
    vs,
    ms,
  };
}

export default useMetrics;
