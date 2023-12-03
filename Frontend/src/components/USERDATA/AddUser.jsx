import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = () => {
	const handleAddingData = (event) => {
		event.preventDefault();
		const form = event.target;
		const data = {
			first_name: form.elements.first_name.value,
			last_name: form.elements.last_name.value,
			email: form.elements.email.value,
			gender: form.elements.gender.value,
			domain: form.elements.domain.value,
			available: form.elements.available.value === "true",
		};
		console.log(data);
		fetch("http://localhost:5000/users/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.insertedId) {
					Swal.fire({
						position: "center",
						icon: "success",
						title: "New User Added Successfully",
						showConfirmButton: false,
						timer: 1500,
					});
				}
				console.log(data);
			});
	};

	return (
		<div>
			<div className="flex items-center justify-center gap-5 my-3">
				<Link to="/" className="btn bg-gray-700 rounded-md">
					Back to Home
				</Link>
				<h2 className="text-center text-3xl font-serif font-bold">Add user</h2>
			</div>
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content flex-col">
					<div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
						<form
							onSubmit={handleAddingData}
							className="card-body grid grid-cols-2 lg:grid-cols-2 gap-4"
						>
							<div className="form-control">
								<label className="label">
									<span className="label-text">First Name</span>
								</label>
								<input
									name="first_name"
									type="text"
									placeholder="First Name"
									className="input input-bordered"
									required
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Last Name</span>
								</label>
								<input
									name="last_name"
									type="text"
									placeholder="Last Name"
									className="input input-bordered"
									required
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input
									name="email"
									type="email"
									placeholder="Email"
									className="input input-bordered"
									required
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Gender</span>
								</label>
								<select name="gender" className="select select-bordered">
									<option>Male</option>
									<option>Female</option>
									<option>Agender</option>
									<option>Polygender</option>
									<option>Bigender</option>
									<option>Genderfluid</option>
									<option>Genderqueer</option>
									<option>Non-binary</option>
								</select>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Avatar</span>
								</label>
								<input
									name="avatar"
									type="text"
									placeholder="Avatar URL"
									className="input input-bordered"
									required
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Domain</span>
								</label>
								<select name="domain" className="select select-bordered">
									<option>Sales</option>
									<option>Marketing</option>
									<option>Finance</option>
									<option>IT</option>
									<option>Management</option>
									<option>UI Designing</option>
									<option>Business Development</option>
								</select>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Available</span>
								</label>
								<select name="available" className="select select-bordered">
									<option>true</option>
									<option>false</option>
								</select>
							</div>
							<div className="form-control col-span-2 mt-6">
								<input
									className="btn btn-primary"
									type="submit"
									value="Add User"
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddUser;
