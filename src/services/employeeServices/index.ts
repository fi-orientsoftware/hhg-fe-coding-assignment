import axiosService from "../axiosService";

export interface IEmployeeFetchParams {
	page?: number;
	limit?: number;
}

export interface IEmployeeData {
	name: string;
	email: string;
	position: string;
}

const listEmployees = (params: IEmployeeFetchParams) =>
	axiosService.get("/employee?sortBy=createdAt&order=desc", { params });

const addNewEmployee = (data: IEmployeeData) =>
	axiosService.post("/employee", data);

export { listEmployees, addNewEmployee };

