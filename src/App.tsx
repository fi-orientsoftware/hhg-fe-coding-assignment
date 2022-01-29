import React from "react";
import RouterApp from "./routers";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterApp />
		</QueryClientProvider>
	);
}

export default App;
