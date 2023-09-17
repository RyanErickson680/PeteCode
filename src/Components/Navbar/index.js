import React, {useState, useEffect} from 'react';
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
import { getUserUsername } from '../../auth/firebase';
import { isSignedIn } from '../../auth/firebase';

const Navbar = () => {

  const [status, setStatus] = useState('Sign In');

  useEffect(() => {

	const getSignedIn = async () => {
		await getUserUsername()
		var testBool = isSignedIn();
		if (testBool) {
		setStatus('Account');
		} else {
		setStatus('Sign In');
		}
			
	};
	getSignedIn();	
  },[]);

return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/'>
			<Logo src={pete}>
			</Logo>
		</NavLink>
		<NavLink to='/board' activeStyle className={'HoverLink'}>
			Leaderboard
		</NavLink>
		<NavLink to='/competitions' activeStyle className={'HoverLink'}>
			Competitions
		</NavLink>
		<NavLink to='/recommendations' activeStyle className={'HoverLink'}>
			Recommendations
		</NavLink>
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		<NavBtn>
		<NavBtnLink to='/login'>{status}</NavBtnLink>
		</NavBtn>
	</Nav>
	</>
);
};

export default Navbar;
