import { cleanup, render } from "@testing-library/react";
import Home from "..";

describe("<Home />", () => {
	afterEach(() => cleanup());

	it("render", () => {
		const screen = render(<Home />);

		expect(screen.getByText("Welcome!")).toBeTruthy();
	});
});
