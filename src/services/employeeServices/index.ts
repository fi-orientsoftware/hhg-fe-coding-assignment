import axiosService from "../axiosService";

export interface IEmployeeFetchParams {
	page?: number;
	limit?: number;
}

export interface IEmployeePostBody {
	name: string;
	email: string;
	position: string;
}

const listEmployees = (params: IEmployeeFetchParams) =>
	axiosService.get("/employee?sortBy=createdAt&order=desc", { params });

const addNewEmployee = (data: IEmployeePostBody) =>
	axiosService.post("/employee", data);

export { listEmployees, addNewEmployee };
