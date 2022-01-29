/* eslint-disable jest/no-conditional-expect */
import { cleanup, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { act } from "react-dom/test-utils";
import Management from "..";
import {
	employeeEndpoint,
	mockEmployeeData,
	PAGE_SIZE,
} from "../../../constants";
import { paginate } from "../../../utils/paginate";

const server = setupServer(
	rest.get(employeeEndpoint, (req, res, ctx) => {
		const page = req.url.searchParams.get("page");
		const limit = req.url.searchParams.get("limit");

		console.log(page);
		return res(
			ctx.json({
				data: paginate(mockEmployeeData, Number(page), Number(limit)),
				total: mockEmployeeData.length,
			})
		);
	}),
	rest.post(employeeEndpoint, (req, res, ctx) => {
		return res(ctx.status(201));
	})
);

describe("<Management />", () => {
	// establish API mocking before all tests
	beforeAll(() => server.listen());
	// reset any request handlers that are declared as a part of our tests
	// (i.e. for testing one-time error scenarios)
	afterEach(() => {
		server.resetHandlers();
		cleanup();
	});
	// clean up once the tests are done
	afterAll(() => server.close());

	it("should render AddNewModal when + New button is clicked", async () => {
		const screen = render(<Management />);

		const addNewBtn = screen.getByRole("button", { name: "+ New" });

		act(() => {
			userEvent.click(addNewBtn);
		});

		// modal title
		const modalTitle = screen.getByText("ADD NEW EMPLOYEE");
		expect(modalTitle).toBeTruthy();

		// add form
		expect(screen.getByLabelText("Employee's name")).toBeTruthy();
		expect(
			screen.getAllByPlaceholderText("Enter employee's name")
		).toBeTruthy();

		expect(screen.getByLabelText("Email")).toBeTruthy();
		expect(
			screen.getAllByPlaceholderText("Enter employee's email")
		).toBeTruthy();

		expect(screen.getByLabelText("Position")).toBeTruthy();
		expect(
			screen.getByPlaceholderText("Enter employee's position")
		).toBeTruthy();
	});

	it("should close modal", () => {
		const screen = render(<Management />);

		const addNewBtn = screen.getByRole("button", { name: "+ New" });

		act(() => {
			userEvent.click(addNewBtn);
		});

		const closeBtn = screen.container.querySelector(".ant-modal-close-x");
		if (closeBtn) {
			act(() => {
				userEvent.click(closeBtn);
			});

			// modal title
			const modalTitle = screen.getByText("ADD NEW EMPLOYEE");
			expect(modalTitle).not.toBeTruthy();

			// add form
			expect(screen.getByLabelText("Employee's name")).not.toBeTruthy();
			expect(
				screen.getAllByPlaceholderText("Enter employee's name")
			).not.toBeTruthy();

			expect(screen.getByLabelText("Email")).not.toBeTruthy();
			expect(
				screen.getAllByPlaceholderText("Enter employee's email")
			).not.toBeTruthy();

			expect(screen.getByLabelText("Position")).not.toBeTruthy();
			expect(
				screen.getByPlaceholderText("Enter employee's position")
			).not.toBeTruthy();
		}
	});

	it("render", async () => {
		const screen = render(<Management />);

		// loading
		const loading = screen.container.querySelector(".ant-spin-nested-loading");
		if (loading) {
			expect(loading).toBeTruthy();
		}

		const data = paginate(mockEmployeeData, 1, PAGE_SIZE);
		await waitFor(() => {
			data.forEach((employee) => {
				expect(screen.getByText(employee.name, { exact: false })).toBeTruthy();
				expect(screen.getByText(employee.email, { exact: false })).toBeTruthy();
				expect(
					screen.getByText(employee.position, { exact: false })
				).toBeTruthy();
			});
		});
	});

	it("should render new data when go to new page", async () => {
		const screen = render(<Management />);

		const page = 2;

		const page2Button = await screen.findByTitle(`${page}`);

		act(() => {
			userEvent.click(page2Button);
		});

		// loading
		const loading = screen.container.querySelector(".ant-spin-nested-loading");
		if (loading) {
			expect(loading).toBeTruthy();
		}
		const data = paginate(mockEmployeeData, page, PAGE_SIZE);

		await waitFor(() => {
			data.forEach((employee) => {
				expect(screen.getByText(employee.name, { exact: false })).toBeTruthy();
				expect(screen.getByText(employee.email, { exact: false })).toBeTruthy();
				expect(
					screen.getByText(employee.position, { exact: false })
				).toBeTruthy();
			});
		});
	});

	it("server error", async () => {
		server.use(
			// override the initial "GET /employee" request handler
			// to return a 500 Server Error
			rest.get(employeeEndpoint, (req, res, ctx) => {
				return res(ctx.status(500));
			})
		);

		const screen = render(<Management />);

		await waitFor(() => {
			expect(screen.getByText("No Data", { exact: false })).toBeTruthy();
		});
	});

	it("add new employee successfully", async () => {
		const screen = render(<Management />);

		const addNewBtn = screen.getByRole("button", { name: "+ New" });

		act(() => {
			userEvent.click(addNewBtn);
		});

		const nameInput = screen.getByLabelText("Employee's name");
		const emailInput = screen.getByLabelText("Email");
		const positionInput = screen.getByLabelText("Position");

		userEvent.type(nameInput, "nick");
		userEvent.type(emailInput, "nick@gmail.com");
		userEvent.type(positionInput, "Junior SE");

		const submitBtn = screen.getByRole("button", { name: "Submit" });

		act(() => {
			userEvent.click(submitBtn);
		});

		await waitFor(() => {
			expect(screen.getByText("Add new employee successfully!")).toBeTruthy();
		});
	});

	it("add new employee fail", async () => {
		server.use(
			// override the initial "GET /employee" request handler
			// to return a 500 Server Error
			rest.post(employeeEndpoint, (req, res, ctx) => {
				return res(ctx.status(500));
			})
		);

		const screen = render(<Management />);

		const addNewBtn = screen.getByRole("button", { name: "+ New" });

		act(() => {
			userEvent.click(addNewBtn);
		});

		const nameInput = screen.getByLabelText("Employee's name");
		const emailInput = screen.getByLabelText("Email");
		const positionInput = screen.getByLabelText("Position");

		userEvent.type(nameInput, "nick");
		userEvent.type(emailInput, "nick@gmail.com");
		userEvent.type(positionInput, "Junior SE");

		const submitBtn = screen.getByRole("button", { name: "Submit" });

		act(() => {
			userEvent.click(submitBtn);
		});

		await waitFor(() => {
			expect(screen.getByText("Add new employee fail!")).toBeTruthy();
		});
	});
});
