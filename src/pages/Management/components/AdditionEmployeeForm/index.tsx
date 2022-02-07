import { Form, FormInstance, Input, Modal, Spin } from "antd";
import React, { FC } from "react";
import { IEmployeeData } from "../../../../services/employeeServices";

export interface IAdditionEmployeeFormProps {
	addNewFormInstance: FormInstance<any>;
	isVisible: boolean;
	isAddingEmployee: boolean;
	handleCloseModal: () => void;
	handleAddNew: (data: IEmployeeData) => void;
}

const AdditionEmployeeForm: FC<IAdditionEmployeeFormProps> = ({
	addNewFormInstance,
	isVisible,
	isAddingEmployee,
	handleCloseModal,
	handleAddNew,
}) => {
	return (
		<Modal
			visible={isVisible}
			title="ADD NEW EMPLOYEE"
			closable
			footer={false}
			onCancel={handleCloseModal}
		>
			<Spin spinning={isAddingEmployee}>
				<Form
					form={addNewFormInstance}
					colon={false}
					labelAlign="left"
					labelCol={{ span: 7 }}
					requiredMark="optional"
					onFinish={handleAddNew}
				>
					<Form.Item
						name="name"
						label="Employee's name"
						required
						tooltip="This is a required field"
						rules={[{ required: true, message: "Name is required" },
						{
							required: true,
							whitespace: true,
							message: "Please input employee's name or delete this field.",
						}]}
					>
						<Input placeholder="Enter employee's name" />
					</Form.Item>
					<Form.Item
						name="email"
						label="Email"
						required
						tooltip="This is a required field"
						rules={[
							{
								type: "email",
								message: "Please enter a valid email to proceed",
							},
							{ required: true, message: "Email is required" },
						]}
					>
						<Input placeholder="Enter employee's email" />
					</Form.Item>
					<Form.Item
						name="position"
						label="Position"
						required
						tooltip="This is a required field"
						rules={[
							{ required: true, message: "Employee's position is required" },
							{
								required: true,
								whitespace: true,
								message: "Please input employee's position or delete this field.",
							}
						]}
					>
						<Input placeholder="Enter employee's position" />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 7 }}>
						<button type="submit" className="btn--cta">
							Submit
						</button>
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	);
};

export default AdditionEmployeeForm;
