import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface ChatIconProps extends SvgProps {
  color?: string;
  width?: number;
  height?: number;
}

const ChatIcon: React.FC<ChatIconProps> = ({
  color = 'currentColor',
  width = 24,
  height = 24,
  ...props
}) => {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill={color}
      width={width}
      height={height}
      {...props}>
      <Path d="M2 8.99374C2 5.68349 4.67654 3 8.00066 3H15.9993C19.3134 3 22 5.69478 22 8.99374V21H8.00066C4.68659 21 2 18.3052 2 15.0063V8.99374ZM14 11V13H16V11H14ZM8 11V13H10V11H8Z" />
    </Svg>
  );
};

export default ChatIcon;
