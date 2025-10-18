import { Bounce } from 'react-native-animated-spinkit';
import { View, StyleSheet } from 'react-native';

function CircleSpinner() {
  return (
    <View style={styles.container}>
      <Bounce size={80} color="rgba(255, 255, 255, 1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center', 
    alignItems: 'center',    
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000, 
  },
});

export default CircleSpinner;
