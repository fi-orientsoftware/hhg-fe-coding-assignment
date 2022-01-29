import {
	cleanup,
	render,
	waitFor,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import AdditionEmployeeForm, { IAdditionEmployeeFormProps } from "..";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { act } from "react-dom/test-utils";
import { setupServer } from "msw/node";
import { employeeEndpoint } from "../../../../../constants";
import React from "react";
import { Form } from "antd";

const server = setupServer(
	rest.post(employeeEndpoint, (req, res, ctx) => {
		return res(ctx.status(201));
	})
);

const WrapperForm = (props: Partial<IAdditionEmployeeFormProps> = {}) => {
	const [form] = Form.useForm();
	const defaultProps: IAdditionEmployeeFormProps = {
		addNewFormInstance: form,
		isVisible: true,
		isAddingEmployee: false,
		handleCloseModal: jest.fn(),
		handleAddNew: jest.fn(),
	};

	return <AdditionEmployeeForm {...defaultProps} {...props} />;
};

describe("<AddNewModal />", () => {
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

	it("render", async () => {
		const handleCloseModal = jest.fn();
		const screen = render(<WrapperForm handleCloseModal={handleCloseModal} />);

		// modal title
		expect(screen.getByText("ADD NEW EMPLOYEE")).toBeTruthy();

		// add form
		expect(screen.getByLabelText("Employee's name")).toBeTruthy();
		expect(
			screen.getAllByPlaceholderText("Enter employee's name")
		).toBeTruthy();

		expect(screen.getByLabelText("Email")).toBeTruthy();
		expect(screen.getByPlaceholderText("Enter employee's email")).toBeTruthy();

		expect(screen.getByLabelText("Position")).toBeTruthy();
		expect(
			screen.getByPlaceholderText("Enter employee's position")
		).toBeTruthy();

		// close btn
		const closeBtn = screen.container.querySelector(".ant-modal-close-x");
		if (closeBtn) {
			userEvent.click(closeBtn);
			// eslint-disable-next-line jest/no-conditional-expect
			expect(handleCloseModal).toHaveBeenCalledTimes(1);
		}
	});

	it("should not allow empty input to be submitted", async () => {
		const screen = render(<WrapperForm />);

		const submitBtn = screen.getByRole("button", { name: "Submit" });
		userEvent.click(submitBtn);

		await waitFor(() => {
			expect(
				screen.getByText("Name is required", { exact: false })
			).toBeTruthy();
			expect(
				screen.getByText("Email is required", { exact: false })
			).toBeTruthy();
			expect(
				screen.getByText("Employee's position is required", { exact: false })
			).toBeTruthy();
		});
	});

	it("should not allow invalid email", async () => {
		const screen = render(<WrapperForm />);

		const emailInput = screen.getByLabelText("Email");
		userEvent.type(emailInput, "invalid mail");
		expect(
			await screen.findByText("Please enter a valid email to proceed")
		).toBeTruthy();

		userEvent.clear(emailInput);
		userEvent.type(emailInput, "test@mail.com");

		await waitForElementToBeRemoved(() =>
			screen.getByText("Please enter a valid email to proceed")
		);
	});

	it("submit successfully", async () => {
		const handleCloseModal = jest.fn();
		const handleAddNew = jest.fn();
		const screen = render(
			<WrapperForm
				handleCloseModal={handleCloseModal}
				handleAddNew={handleAddNew}
			/>
		);

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
			expect(handleAddNew).toHaveBeenCalled();
		});
	});

	it("submit fail", async () => {
		server.use(
			// override the initial "GET /employee" request handler
			// to return a 500 Server Error
			rest.post(employeeEndpoint, (req, res, ctx) => {
				return res(ctx.status(500));
			})
		);

		const handleCloseModal = jest.fn();
		const handleAddNew = jest.fn();
		const screen = render(
			<WrapperForm
				handleCloseModal={handleCloseModal}
				handleAddNew={handleAddNew}
			/>
		);

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
			expect(handleAddNew).toHaveBeenCalled();
		});
	});
});
