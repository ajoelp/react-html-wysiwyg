import { space, SpaceProps, flexbox, FlexboxProps, color, ColorProps, layout, LayoutProps } from 'styled-system';
import styled from 'styled-components';

type BoxProps = SpaceProps & FlexboxProps & ColorProps & LayoutProps;

export const Box = styled.div<BoxProps>`
  ${flexbox};
  ${space};
  ${color};
  ${layout}
`;
