import { Breadcrumb, Form, message, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { PAGE_SIZE } from "../../constants";
import { useFetchWithPagination, useMutation } from "../../hook";
import { addNewEmployee, listEmployees } from "../../services/employeeServices";
import columns from "./columns";
import AdditionEmployeeForm from "./components/AdditionEmployeeForm";

const Management = () => {
	const [isAddingNewEmployee, setIsAddingNewEmployee] =
		useState(false);

	const handleCloseModal = useCallback(() => {
		setIsAddingNewEmployee(false);
	}, [setIsAddingNewEmployee]);

	const handleOpenModal = useCallback(() => {
		setIsAddingNewEmployee(true);
	}, [setIsAddingNewEmployee]);

	// fetch employees
	const {
		page,
		setPage,
		goToFirstPage,
		isLoading,
		data,
		refetch: refetchEmployees,
	} = useFetchWithPagination(listEmployees);

	const handleAfterAddNewEmployee = useCallback(() => {
		if (page === 1) {
			refetchEmployees();
		} else {
			goToFirstPage();
		}
	}, [goToFirstPage, refetchEmployees, page]);

	const handleTableChange = useCallback(
		(config) => {
			const { current } = config;
			setPage(current);
		},
		[setPage]
	);

	// Add new employee
	const [form] = Form.useForm();

	const { request: handleAddNewEmployee, isLoading: isAddingEmployee } =
		useMutation({
			apiCallback: addNewEmployee,
			onFailure: () => {
				message.error("Add new employee fail!");
			},
			onSuccess: useCallback(() => {
				handleAfterAddNewEmployee();
				message.success("Add new employee successfully!");
			}, [handleAfterAddNewEmployee]),
			onFinish: () => {
				form.resetFields();
				handleCloseModal();
			},
		});

	useEffect(() => {
		document.title = "Employee Management";
	}, []);

	return (
		<>
			<Breadcrumb>
				<Breadcrumb.Item href="/">
					🏠
				</Breadcrumb.Item>
				<Breadcrumb.Item>Employees Management</Breadcrumb.Item>
			</Breadcrumb>
			<div className="management__table-header">
				<h1 className="management__table-header__title">Employees</h1>
				<button type="button" className="btn--cta" onClick={handleOpenModal}>
					+ New
				</button>
			</div>
			<Table
				dataSource={data?.data}
				loading={isLoading}
				columns={columns}
				pagination={{
					pageSize: PAGE_SIZE,
					total: data?.total || 0,
					current: page,
					showSizeChanger: false,
				}}
				size="small"
				onChange={handleTableChange}
				rowKey="id"
			/>
			<AdditionEmployeeForm
				addNewFormInstance={form}
				isVisible={isAddingNewEmployee}
				isAddingEmployee={isAddingEmployee}
				handleCloseModal={handleCloseModal}
				handleAddNew={handleAddNewEmployee}
			/>
		</>
	);
};

export default Management;
