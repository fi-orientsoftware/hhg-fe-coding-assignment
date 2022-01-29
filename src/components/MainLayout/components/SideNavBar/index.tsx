import React, { FC } from "react";
import { Menu } from "antd";
import { Link, useHistory } from "react-router-dom";

export interface ISideBarLinks {
	path: string;
	name: string;
}

export interface ISideNavBarProps {
	sideBarLinks: ISideBarLinks[];
}

const SideNavBar: FC<ISideNavBarProps> = ({ sideBarLinks }) => {
	const { location } = useHistory();

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<Menu
				className="menu"
				defaultSelectedKeys={[location.pathname]}
				defaultOpenKeys={["sub1"]}
				mode="inline"
			>
				{sideBarLinks.map((link) => {
					return (
						<Menu.Item key={link.path}>
							<Link to={link.path}>{link.name}</Link>
						</Menu.Item>
					);
				})}
			</Menu>
		</div>
	);
};

export default SideNavBar;
