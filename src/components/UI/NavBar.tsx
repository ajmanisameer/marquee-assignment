import { useCallback, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import tw from 'tailwind-styled-components';
import Hamburger from 'hamburger-react';
import LogoV2 from '../../icons/LogoV2';
import { UserContext } from '../../_store/UserContext';

const Container = tw.nav`
  sticky
  z-20
  top-0
  w-full
  flex 
  items-center 
  flex-wrap 

  md:py-3
  md:px-8
  
  bg-black 
`;

const MenuToggle = tw(motion.div)`
  inline-flex

  pr-3
  md:pr-8
  pb-2
  pt-2
  md:pt-1
  ml-auto
  md:hidden

  text-gray-300
  text-white
  hover:text-white
  outline-none
`;
const NavAnchor = tw.div`
  md:w-auto
  w-full
  px-3
  py-2
  mx-1
  md:text-sm
  text-purple-600 
  font-bold  
  hover:text-white
  cursor-pointer
`;

const LogoLink = tw.a`
  inline-flex
  items-center
  h-12
  w-12
  
  pl-2
  md:pl-0
  ml-4
  md:ml-0

  text-white
`;

const MenuLinks = tw.div`
  items-start
  flex
  flex-col
  w-full
  md:inline-flex
  md:flex-row
  md:ml-auto
  md:w-auto
  md:h-auto
  md:items-center

  p-2
  pt-0
  md:pb-0
  md:px-0

  bg-black
`;


const MenuContainer = tw.div`
  w-full
  h-0
  md:h-auto
  md:inline-flex
  md:flex-grow
  md:w-auto

  text-center
`;

const NavBar = () => {
  const [active, setActive] = useState(false);
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const { logout } = useContext(UserContext);
  const [user, setUser] = useState<string | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  console.log(user)

  const handleClick = useCallback((toggled: boolean) => {
    setActive(toggled);
    setHamburgerActive(toggled);
  }, []);

  const handleLogout = () => {
    logout(); // Call the logout function to reset the user context
  };

  return (
    <Container>
      <motion.div
        className="flex"
        whileHover={{ scale: 1.2 }}
        whileTap={{
          scale: 0.8,
        }}
      >
        <LogoLink title="Nyte Lytes">
          <LogoV2 />
        </LogoLink>
      </motion.div>
      <MenuToggle
        whileHover={{ scale: 1.2 }}
        whileTap={{
          scale: 0.8,
        }}
      >
        <Hamburger size={18} onToggle={handleClick} toggled={hamburgerActive} />
      </MenuToggle>
      <MenuContainer className={`${active ? '' : 'hidden'}`}>
        <MenuLinks>
          <NavAnchor onClick={() => handleClick(false)}>
            <Link to="/">Dashboard</Link>
          </NavAnchor>
          {user ? (
            <NavAnchor onClick={handleLogout}>
              <Link to="/">Logout</Link>
            </NavAnchor>
          ) : (
            <NavAnchor onClick={() => handleClick(false)}>
              <Link to="/login">Login</Link>
            </NavAnchor>
          )}
        </MenuLinks>
      </MenuContainer>
    </Container>
  );
}

export default NavBar;