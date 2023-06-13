import { ReactNode } from 'react';

import tw from 'tailwind-styled-components';

const Section = tw.section`
  px-6
  py-16
  max-w-7xl
  m-auto
`;

type IContainerProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

const Container = (props: IContainerProps) => (
  <Section id={props.id} className={props.className}>
    {props.children}
  </Section>
);

export default Container;
