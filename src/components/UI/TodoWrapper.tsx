  // delete a subtask
  import { ReactNode } from 'react';

  import tw from 'tailwind-styled-components';
  
  const Section = tw.summary`
  flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer
  `;
  
  type IContainerProps = {
    children: ReactNode;
    className?: string;
    id?: string;
  };
  
  const TodoWrapper = (props: IContainerProps) => (
    <Section id={props.id} className={props.className}>
      {props.children}
    </Section>
  );
  
  export default TodoWrapper;
  