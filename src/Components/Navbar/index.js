import React from 'react';
import pete from './Purdue-Pete.jpg'
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
Logo,
} from './navbarElements';

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/'>
			<Logo src={pete}>
			</Logo>
		</NavLink>
		<NavLink to='/board' activeStyle>
			Leaderboard
		</NavLink>
		<NavLink to='/competitions' activeStyle>
			Competitions
		</NavLink>
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		<NavBtn>
		<NavBtnLink to='/login'>Sign In</NavBtnLink>
		</NavBtn>
	</Nav>
	</>
);
};

export default Navbar;
