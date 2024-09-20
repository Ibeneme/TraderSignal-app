import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface HomeIconProps extends SvgProps {
  color?: string;
  width?: number;
  height?: number;
  borderRadius? : number
}

const HomeIcon: React.FC<HomeIconProps> = ({
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
      <Path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20Z" />
    </Svg>
  );
};

export default HomeIcon;
