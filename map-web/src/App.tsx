import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { IndexPage } from "./pages/index/index.page";
import { AuthPage } from "./pages/auth/auth.page";
import { SideBar } from "./components";

function App() {
	return (
		<Router>
			<SideBar />
			<Routes>
				<Route path="/" element={<IndexPage />} />
				<Route path="auth/:authType" element={<AuthPage />} />
			</Routes>
		</Router>
	);
}

export default App;
