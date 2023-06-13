  // delete a subtask
  import { ReactNode } from 'react';

  import tw from 'tailwind-styled-components';
  
  const Section = tw.article`
  pb-2  `;
  
  type IContainerProps = {
    children: ReactNode;
    className?: string;
    id?: string;
  };
  
  const SubtaskWrapper = (props: IContainerProps) => (
    <Section id={props.id} className={props.className}>
      {props.children}
    </Section>
  );
  
  export default SubtaskWrapper;
  