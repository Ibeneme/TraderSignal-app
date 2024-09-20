import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface SendMessageIconProps extends SvgProps {
  color?: string;
  width?: number;
  height?: number;
}

const SendMessageIcon: React.FC<SendMessageIconProps> = ({
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
      <Path d="M1.94607 9.31543C1.42353 9.14125 1.4194 8.86022 1.95682 8.68108L21.043 2.31901C21.5715 2.14285 21.8746 2.43866 21.7265 2.95694L16.2733 22.0432C16.1223 22.5716 15.8177 22.59 15.5944 22.0876L11.9999 14L17.9999 6.00005L9.99992 12L1.94607 9.31543Z" />
    </Svg>
  );
};

export default SendMessageIcon;