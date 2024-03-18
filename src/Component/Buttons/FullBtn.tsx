import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

type Props = {
  buttonText: string;
  onPress: () => void; // Define the type of onPress prop
};

const FullBtn = ({buttonText, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.btnWidth} onPress={onPress}>
      <Text style={styles.btnText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default FullBtn;

const styles = StyleSheet.create({
  btnWidth: {
    backgroundColor: '#ffaa00',
    height: 50,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 48,
    marginVertical: 24,
  },
  btnText: {
    fontSize: 16,
    fontFamily: 'Plus Jakarta Sans SemiBold',
    color: '#fff',
  },
});
