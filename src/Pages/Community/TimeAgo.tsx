import React from 'react';
import {Text} from 'react-native';

interface Props {
  timestamp: string; // Assuming the timestamp is in ISO 8601 format
}

const TimeAgo: React.FC<Props> = ({timestamp}) => {
  const getTimeDifference = (timestamp: string): string => {
    const currentTime = new Date();
    const pastTime = new Date(timestamp);
    const timeDifference = Math.floor(
      (currentTime.getTime() - pastTime.getTime()) / 1000,
    );

    if (timeDifference < 60) {
      return `${timeDifference} second${timeDifference !== 1 ? 's' : ''} ago`;
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      // Handle cases for days, weeks, months, etc. if needed
      // For simplicity, let's return the full timestamp
      return timestamp;
    }
  };

  return (
    <Text
      style={{color: '#ffaa0095', fontFamily: 'Plus Jakarta Sans SemiBold', fontSize: 9}}>
      {getTimeDifference(timestamp)}
    </Text>
  );
};

export default TimeAgo;
