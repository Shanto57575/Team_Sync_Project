import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserList = ({
	searchQuery,
	filteredUser,
	usersPerPage,
	currentUsers,
	paginate,
	currentPage,
	filters,
	setUserData,
	handleCheckboxChange,
	Loading,
}) => {
	const handleDelete = (id) => {
		console.log(id);
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(`http://localhost:5000/users/${id}`, {
					method: "DELETE",
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.deletedCount > 0) {
							Swal.fire({
								position: "center",
								icon: "success",
								title: "User deleted Successfully",
								showConfirmButton: false,
								timer: 1500,
							});
							currentUsers = currentUsers.filter(
								(matched) => matched._id !== id
							);
							setUserData(currentUsers);
						}
					});
			}
		});
	};

	return (
		<>
			<h1>
				{searchQuery && (
					<div className="text-center text-xl text-white mt-3 mb-10">
						{filteredUser.length === 0 ? (
							<span>No user Found</span>
						) : (
							`${filteredUser.length} user${
								filteredUser.length !== 1 ? "s" : ""
							} found`
						)}
					</div>
				)}
			</h1>
			<h3 className="text-xl mb-2">Filter by :</h3>
			<div className="text-white lg:flex justify-between">
				<div className="w-full lg:w-[20%] shadow-md shadow-cyan-400">
					<div className="space-y-2 border-b border-gray-700 px-5 py-3">
						<h1 className="font-bold text-xl">Domain</h1>
						<div className="flex items-center">
							<input
								className="w-5 h-5 mr-2 cursor-pointer"
								type="checkbox"
								value="Sales"
								checked={filters.domain.includes("Sales")}
								onChange={(e) => handleCheckboxChange("domain", e.target.value)}
							/>
							<label htmlFor="Sales">Sales</label>
						</div>
						<div className="flex items-center">
							<input
								className="w-5 h-5 mr-2 cursor-pointer"
								type="checkbox"
								value="Marketing"
								checked={filters.domain.includes("Marketing")}
								onChange={(e) => handleCheckboxChange("domain", e.target.value)}
							/>
							<label htmlFor="Marketing">Marketing</label>
						</div>
						<div className="flex items-center">
							<input
								className="w-5 h-5 mr-2 cursor-pointer"
								type="checkbox"
								value="Finance"
								checked={filters.domain.includes("Finance")}
								onChange={(e) => handleCheckboxChange("domain", e.target.value)}
							/>
							<label htmlFor="Finance">Finance</label>
						</div>
						<div className="flex items-center">
							<input
								className="w-5 h-5 mr-2 cursor-pointer"
								type="checkbox"
								value="IT"
								checked={filters.domain.includes("IT")}
								onChange={(e) => handleCheckboxChange("domain", e.target.value)}
							/>
							<label htmlFor="IT">IT</label>
						</div>
						<div className="flex items-center">
							<input
								className="w-5 h-5 mr-2 cursor-pointer"
								type="checkbox"
								value="Management"
								checked={filters.domain.includes("Management")}
								onChange={(e) => handleCheckboxChange("domain", e.target.value)}
							/>
							<label htmlFor="Management">Management</label>
						</div>
						<div className="flex items-center">
							<input
								className="w-5 h-5 mr-2 cursor-pointer"
								type="checkbox"
								value="UI Designing"
								checked={filters.domain.includes("UI Designing")}
								onChange={(e) => handleCheckboxChange("domain", e.target.value)}
							/>
							<label htmlFor="UI Designing">UI Designing</label>
						</div>
						<div className="flex items-center">
							<input
								className="w-5 h-5 mr-2 cursor-pointer"
								type="checkbox"
								value="Business Development"
								checked={filters.domain.includes("Business Development")}
								onChange={(e) => handleCheckboxChange("domain", e.target.value)}
							/>
							<label htmlFor="Business Development">Business Development</label>
						</div>
					</div>
					<div className="space-y-2 mt-5 border-b border-gray-700 px-5 py-3">
						<h1 className="font-bold text-xl">Gender</h1>
						<div className="flex items-center">
							<input
								className="w-5 h-5 mr-2 cursor-pointer"
								type="checkbox"
								value="Male"
								checked={filters.gender.includes("Male")}
								onChange={(e) => handleCheckboxChange("gender", e.target.value)}
							/>
							<label htmlFor="Male">Male</label>
						</div>
						<div className="flex items-center">
							<input
								className="w-5 h-5 mr-2 cursor-pointer"
								type="checkbox"
								value="Female"
								checked={filters.gender.includes("Female")}
								onChange={(e) => handleCheckboxChange("gender", e.target.value)}
							/>
							<label htmlFor="Female">Female</label>
						</div>
						<div className="flex items-center">
							<input
								className="w-5 h-5 mr-2 cursor-pointer"
								type="checkbox"
								value="Agender"
								checked={filters.gender.includes("Agender")}
								onChange={(e) => handleCheckboxChange("gender", e.target.value)}
							/>
							<label htmlFor="Agender">Agender</label>
						</div>
						<div className="flex items-center">
							<input
								className="w-5 h-5 mr-2 cursor-pointer"
								type="checkbox"
								value="Polygender"
								checked={filters.gender.includes("Polygender")}
								onChange={(e) => handleCheckboxChange("gender", e.target.value)}
							/>
							<label htmlFor="Polygender">Polygender</label>
						</div>
						<div className="flex items-center">
							<input
								className="w-5 h-5 mr-2 cursor-pointer"
								type="checkbox"
								value="Bigender"
								checked={filters.gender.includes("Bigender")}
								onChange={(e) => handleCheckboxChange("gender", e.target.value)}
							/>
							<label htmlFor="Bigender">Bigender</label>
						</div>
						<div className="flex items-center">
							<input
								className="w-5 h-5 mr-2 cursor-pointer"
								type="checkbox"
								value="Genderfluid"
								checked={filters.gender.includes("Genderfluid")}
								onChange={(e) => handleCheckboxChange("gender", e.target.value)}
							/>
							<label htmlFor="Genderfluid">Genderfluid</label>
						</div>
						<div className="flex items-center">
							<input
								className="w-5 h-5 mr-2 cursor-pointer"
								type="checkbox"
								value="Genderqueer"
								checked={filters.gender.includes("Genderqueer")}
								onChange={(e) => handleCheckboxChange("gender", e.target.value)}
							/>
							<label htmlFor="Genderqueer">Genderqueer</label>
						</div>
						<div className="flex items-center">
							<input
								className="w-5 h-5 mr-2 cursor-pointer"
								type="checkbox"
								value="Non-binary"
								checked={filters.gender.includes("Non-binary")}
								onChange={(e) => handleCheckboxChange("gender", e.target.value)}
							/>
							<label htmlFor="Non-binary">Non-binary</label>
						</div>
					</div>
					<div className="space-y-2 mt-5 px-5 py-3">
						<h1 className="font-bold text-xl">Availability</h1>
						<div className="flex items-center">
							<input
								className="w-5 h-5 mr-2 cursor-pointer"
								type="checkbox"
								value={true}
								checked={filters.available.includes("true")}
								onChange={(e) =>
									handleCheckboxChange("available", e.target.value)
								}
							/>
							<label htmlFor="Available">Available</label>
						</div>
						<div className="flex items-center">
							<input
								className="w-5 h-5 mr-2 cursor-pointer"
								type="checkbox"
								value={false}
								checked={filters.available.includes("false")}
								onChange={(e) =>
									handleCheckboxChange("available", e.target.value)
								}
							/>
							<label htmlFor="NotAvailable">Not Available</label>
						</div>
					</div>
				</div>
				{Loading ? (
					<div className="w-full mx-auto flex items-center justify-center text-5xl">
						L
						<span className="w-10 h-10 animate-spin rounded-full border-8 border-dashed"></span>{" "}
						ading....
					</div>
				) : (
					<div className="w-full lg:w-[78%] grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mb-10">
						{currentUsers.map((user) => (
							<div
								key={user.id}
								className="card h-72 cursor-pointer shadow-md shadow-cyan-300 hover:shadow-2xl hover:border-2 rounded-none"
							>
								<figure className="bg-[#b5dcf2] my-3 h-20 w-20 rounded-full mx-auto">
									<img src={user.avatar} alt="profile" />
								</figure>
								<Link
									className="absolute top-3 right-2 btn bg-gray-700 rounded-md"
									to={`/updateuser/${user._id}`}
								>
									<button>Update</button>
								</Link>
								<div className="card-body">
									<h2 className="card-title">
										{user.first_name} {user.last_name}
									</h2>
									<div className="badge badge-primary bg-cyan-500 text-black text-xs border-none">
										{user.domain}
									</div>
									<p>{user.email}</p>
									<div className="card-actions flex items-center justify-start">
										<div className="badge badge-outline">{user.gender}</div>
										<div className="badge badge-outline">
											{user.available ? (
												<span className="text-emerald-500">available</span>
											) : (
												<span className="text-red-500">Not available</span>
											)}
										</div>
										<button
											onClick={() => handleDelete(user._id)}
											className="btn btn-sm bg-gray-700"
										>
											Delete
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{filteredUser.length > usersPerPage && (
				<div className="text-center my-10">
					<button
						className="btn w-24 bg-zinc-800 rounded-none"
						onClick={() => paginate(currentPage - 1)}
						disabled={currentPage === 1}
					>
						previous
					</button>
					<button
						className="btn w-16 bg-zinc-800 rounded-none"
						onClick={() => paginate(currentPage)}
					>
						{currentPage}
					</button>
					<button
						className="btn w-24 bg-zinc-800 rounded-none"
						onClick={() => paginate(currentPage + 1)}
						disabled={
							currentPage === Math.ceil(filteredUser.length / usersPerPage)
						}
					>
						Next
					</button>
				</div>
			)}
		</>
	);
};

export default UserList;
