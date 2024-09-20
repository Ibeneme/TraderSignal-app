import React, {useRef, useEffect} from 'react';
import {View, Image, Animated, StyleSheet} from 'react-native';
import {Colors} from '../Colors/Colors';
const logoImage = require('../../../assets/images/logo.jpg');

interface LoaderProps {
  animationScale?: number;
  animationDuration?: number;
}

const Loader: React.FC<LoaderProps> = ({
  animationScale = 1.2,
  animationDuration = 1000,
}) => {
  const animatedValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const zoomIn = Animated.timing(animatedValue, {
      toValue: animationScale,
      duration: animationDuration,
      useNativeDriver: true,
    });

    const zoomOut = Animated.timing(animatedValue, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    });

    const loop = Animated.sequence([zoomIn, zoomOut]);

    const loopAnimation = Animated.loop(loop);

    loopAnimation.start();

    return () => {
      loopAnimation.stop();
    };
  }, [animatedValue, animationScale, animationDuration]);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: 100,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.Image
          source={logoImage}
          style={[styles.logo, {transform: [{scale: animatedValue}]}]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.newBG,
    zIndex: 12,
  },
  logo: {
    width: 100, // Adjust the width and height of your logo as needed
    height: 100,
    borderRadius: 120,
  },
});

export default Loader;
