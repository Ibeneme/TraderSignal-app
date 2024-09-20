import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface ArrowRightProps extends SvgProps {
  color?: string;
  width?: number;
  height?: number;
}

const ArrowRight: React.FC<ArrowRightProps> = ({
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
      <Path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 11H8V13H12V16L16 12L12 8V11Z" />
    </Svg>
  );
};

export default ArrowRight;


