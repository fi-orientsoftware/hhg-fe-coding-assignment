import { Layout } from "antd";
import React, { FC } from "react";


const MainLayout: FC = ({ children }) => {
	return (
		<Layout className="main-layout">
			<Layout className="main-layout__content">{children}</Layout>
		</Layout>
	);
};

export default MainLayout;
