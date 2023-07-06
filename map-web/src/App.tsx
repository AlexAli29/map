import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { IndexPage } from "./pages/index/index.page";
import { AuthPage } from "./pages/auth/auth.page";

const router = createBrowserRouter([
	{
		path: "/",
		element: <IndexPage />,
	},
	{
		path: "/auth/:authType",
		element: <AuthPage />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
