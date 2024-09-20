import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface AcademyIconProps extends SvgProps {
  color?: string;
  width?: number;
  height?: number;
}

const AcademyIcon: React.FC<AcademyIconProps> = ({
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
      <Path d="M23 18.9999H22V8.99991H18V6.58569L12 0.585693L6 6.58569V8.99991H2V18.9999H1V20.9999H23V18.9999ZM6 19H4V11H6V19ZM18 11H20V19H18V11ZM11 12H13V19H11V12Z" />
    </Svg>
  );
};

export default AcademyIcon;
