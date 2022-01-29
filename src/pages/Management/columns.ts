import { ColumnsType } from "antd/lib/table";

const columns: ColumnsType<any> = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "Position",
		dataIndex: "position",
		key: "position",
	},
];

export default columns;
