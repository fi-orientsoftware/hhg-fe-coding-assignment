import { cleanup, render } from "@testing-library/react";
import { Router } from "react-router";
import SideNavBar from "..";
import { createMemoryHistory } from "history";
import { LINKS_TO_SHOW } from "../../../constants";

const renderNavBar = () => {
	const history = createMemoryHistory();

	return render(
		<Router history={history}>
			<SideNavBar sideBarLinks={LINKS_TO_SHOW} />
		</Router>
	);
};

describe("<SideNavBar />", () => {
	afterEach(cleanup);

	it("render", () => {
		const screen = renderNavBar();

		expect(screen.getByText(/Home/i)).toBeTruthy();
		expect(screen.getByText(/Counter/i)).toBeTruthy();
		expect(screen.getByText(/Management/i)).toBeTruthy();
	});
});
