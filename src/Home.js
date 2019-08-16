import React from 'react';
import { Link } from 'react-router-dom';
import logo from './react.svg';
import './Home.css';

class Home extends React.Component {
	render() {
		return (
			<div className="Home">
				<div className="Home-header">
					<img src={logo} className="Home-logo" alt="logo" />
					<h2>Welcome to Razzle</h2>
				</div>
				<ul className="Home-resources">
					<li>
						<Link to="/hook-page">Normal Hook</Link>
					</li>
					<li>
						<Link to="/hook-memo">Memo Hook</Link>
					</li>
				</ul>
			</div>
		);
	}
}

export default Home;
