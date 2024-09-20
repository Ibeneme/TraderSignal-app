import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface ArrowLeftProps extends SvgProps {
  color?: string;
  width?: number;
  height?: number;
}

const ArrowLeft: React.FC<ArrowLeftProps> = ({
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
      <Path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 11V8L8 12L12 16V13H16V11H12Z" />
    </Svg>
  );
};

export default ArrowLeft;
