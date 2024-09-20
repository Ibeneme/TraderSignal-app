import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

interface PendingFileIconProps {
  size?: number;
  color?: string;
}

const PendingFileIcon: React.FC<PendingFileIconProps> = ({ size = 24, color = '#ffaa00' }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Circle cx="12" cy="12" r="10" />
        <Path d="M12 16v-4M12 8h.01" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PendingFileIcon;
