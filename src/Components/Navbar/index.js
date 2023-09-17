import React, { useState, useEffect } from 'react';
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
import { isProblemSolved } from '../../auth/firebase';

const Navbar = () => {

	const [status, setStatus] = useState('Sign In');
	const [solved, setSolved] = useState(false);

	useEffect(() => {
		const changePath = ''
		const changeElement = ''

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

		const fetchData = async () => {
			try {
				setSolved(await isProblemSolved())
				// Handle the fetched data here
				console.log(solved)
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
		fetchData();
	}, []);


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
					<NavLink to={solved ? 'POTDboard' : 'competitions'} activeStyle className={'HoverLink'}>
						{solved ? 'POTDboard' : 'Competitions'}
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
