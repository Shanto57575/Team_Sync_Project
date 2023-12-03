import { useState, useEffect } from "react";
import UserList from "./UserList";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const SearchBar = () => {
	const [userData, setUserData] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [Loading, setLoading] = useState(true);

	const [filters, setFilters] = useState({
		domain: [],
		gender: [],
		available: [],
	});

	const [currentPage, setCurrentPage] = useState(1);
	const usersPerPage = 20;

	useEffect(() => {
		fetch("http://localhost:5000/users")
			.then((res) => res.json())
			.then((data) => {
				setUserData(data);
				setLoading(false);
			});
	}, []);

	const handleCheckboxChange = (category, value) => {
		setFilters((prevFilters) => {
			const isValueSelected = prevFilters[category].includes(value);

			if (isValueSelected) {
				const updatedFilters = prevFilters[category].filter(
					(item) => item !== value
				);
				return { ...prevFilters, [category]: updatedFilters };
			} else {
				const updatedFilters = [...prevFilters[category], value];
				return { ...prevFilters, [category]: updatedFilters };
			}
		});
	};

	const filteredUser = searchQuery
		? userData.filter((user) =>
				`${user.first_name} ${user.last_name}`
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
		  )
		: userData;

	const filteredAndPaginatedUsers = filteredUser
		?.filter(
			(user) =>
				(filters.domain.length === 0 || filters.domain.includes(user.domain)) &&
				(filters.gender.length === 0 || filters.gender.includes(user.gender)) &&
				(filters.available.length === 0 ||
					filters.available.includes(String(user.available)))
		)
		.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<>
			<div className="flex items-center justify-between">
				<img className="w-20" src={logo} alt="" />
				{/* Search Input Area */}
				<form className="md:w-1/2 mx-3 md:mx-auto text-center my-10">
					<label
						htmlFor="default-search"
						className="mb-2 text-sm font-medium text-gray-900 sr-only"
					>
						Search
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
							<svg
								className="w-4 h-4"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg>
						</div>
						<input
							type="text"
							id="default-search"
							className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Search by Names..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</form>
				<Link to="/adduser">
					<button className="btn bg-gray-700 rounded-md">Add User</button>
				</Link>
			</div>
			<UserList
				searchQuery={searchQuery}
				filteredUser={filteredUser}
				usersPerPage={usersPerPage}
				currentUsers={filteredAndPaginatedUsers}
				currentPage={currentPage}
				filters={filters}
				handleCheckboxChange={handleCheckboxChange}
				paginate={paginate}
				Loading={Loading}
				setUserData={setUserData}
			/>
		</>
	);
};

export default SearchBar;
