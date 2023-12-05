import { useEffect, useState } from "react";
import SearchBar from "./components/USERDATA/SearchBar";
import UserList from "./components/USERDATA/UserList";

const App = () => {
	const [userData, setUserData] = useState([]);
	const [Loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		fetch("https://backend-alpha-lovat.vercel.app/users")
			.then((res) => res.json())
			.then((data) => {
				setUserData(data);
				setLoading(false);
			});
	}, []);

	const [filters, setFilters] = useState({
		domain: [],
		gender: [],
		available: [],
	});

	const [currentPage, setCurrentPage] = useState(1);
	const usersPerPage = 20;

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
		<div className="container mx-auto font-serif">
			<SearchBar
				userData={userData}
				setUserData={setUserData}
				Loading={Loading}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>
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
		</div>
	);
};

export default App;
