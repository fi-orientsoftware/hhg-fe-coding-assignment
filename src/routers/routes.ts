import Home from "../pages/Home";
import Management from "../pages/Management";
import Menu from "../pages/Menu";

interface IRoute {
	path: string;
	exact: boolean;
	component: any;
}

const routes: IRoute[] = [
	{
		path: "/",
		exact: true,
		component: Home,
	},
	{
		path: "/employee-management",
		exact: true,
		component: Management,
	},
	{
		path: "/menu",
		exact: true,
		component: Menu,
	},
];

export default routes;
