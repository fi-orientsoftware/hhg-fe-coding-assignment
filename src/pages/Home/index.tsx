import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
	useEffect(() => {
		document.title = "Home";
	}, []);
	return (
		<div className="home-page">
			<h1 className="home-page__welcome">Welcome!</h1>
			<ul className="home-page__links">
				<li className="home-page__link"><Link to={'/employee-management'}>Employee Management</Link></li>
				<li className="home-page__link"><Link to={'/menu'}>Menu</Link></li>
			</ul>
		</div>
	);
};

export default Home;
