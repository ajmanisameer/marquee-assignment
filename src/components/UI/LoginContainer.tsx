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

const LoginContainer = (props: IContainerProps) => (
  <Section id={props.id} className={props.className}>
    <div>
      <div className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800
          bg-opacity-70
        "
      >
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
          {/*content*/}
          <div className="
            h-full
            lg:h-auto
            border-0 
            rounded-lg 
            shadow-lg 
            relative 
            flex 
            flex-col 
            w-full 
            bg-black 
            outline-none 
            focus:outline-none
            "
          >
            {/*header*/}
              {props.children}
          </div>
        </div>
      </div>
    </div>

  </Section>
);

export default LoginContainer;
