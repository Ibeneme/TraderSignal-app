import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface UserIconProps extends SvgProps {
  color?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}

const UserIcon: React.FC<UserIconProps> = ({
  color = 'currentColor',
  width = 24,
  height = 24,
  borderRadius = 24,
  ...props
}) => {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill={color}
      width={width}
      height={height}
      {...props}>
      <Path d="M5 20H19V22H5V20ZM12 18C7.58172 18 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 14.4183 16.4183 18 12 18Z" />
    </Svg>
  );
};

export default UserIcon;
