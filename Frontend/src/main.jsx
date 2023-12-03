import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddUser from "./components/USERDATA/AddUser.jsx";
import UpdateUser from "./components/USERDATA/UpdateUser.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/adduser",
		element: <AddUser />,
	},
	{
		path: "/updateuser/:id",
		element: <UpdateUser />,
		loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`),
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
