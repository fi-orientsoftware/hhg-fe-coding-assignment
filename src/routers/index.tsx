import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import routes from "./routes";

const RouterApp = () => {
	return (
		<Router>
			<MainLayout>
				<Switch>
					{routes.map((route) => (
						<Route key={route.path} {...route} />
					))}
				</Switch>
			</MainLayout>
		</Router>
	);
};

export default RouterApp;
