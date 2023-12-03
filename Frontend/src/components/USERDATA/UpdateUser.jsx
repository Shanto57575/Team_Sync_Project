import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateUser = () => {
	const data = useLoaderData();
	console.log(data._id);

	const handleUpdate = (event) => {
		event.preventDefault();
		const form = event.target;
		const first_name = form.first_name.value;
		const last_name = form.last_name.value;
		const email = form.email.value;
		const gender = form.gender.value;
		const avatar = form.avatar.value;
		const available = form.available.value;
		const domain = form.domain.value;

		const updateData = {
			first_name,
			last_name,
			email,
			gender,
			avatar,
			available,
			domain,
		};

		fetch(`http://localhost:5000/users/${data._id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(updateData),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount > 0) {
					Swal.fire({
						position: "center",
						icon: "success",
						title: "User data updated Successfully",
						showConfirmButton: false,
						timer: 1500,
					});
				}
			});
	};

	return (
		<div>
			<div className="flex items-center justify-center gap-5 my-3 mt-20">
				<Link to="/" className="btn bg-gray-700 rounded-md">
					Back to Home
				</Link>
				<h2 className="text-center text-3xl font-serif font-bold">
					update user
				</h2>
			</div>
			<div className="hero bg-base-200">
				<div>
					<div className="card w-full shadow-2xl bg-base-100">
						<form onSubmit={handleUpdate} className="card-body">
							<div className="flex items-center justify-center gap-4">
								<div className="form-control">
									<label className="label">
										<span className="label-text">First Name</span>
									</label>
									<input
										defaultValue={data.first_name}
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
										defaultValue={data.last_name}
										name="last_name"
										type="text"
										placeholder="Last Name"
										className="input input-bordered"
										required
									/>
								</div>
							</div>
							<div className="flex items-center justify-center gap-4">
								<div className="form-control">
									<label className="label">
										<span className="label-text">Gender</span>
									</label>
									<select
										defaultValue={data.gender}
										name="gender"
										className="select select-bordered"
									>
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
										<span className="label-text">Domain</span>
									</label>
									<select
										defaultValue={data.domain}
										name="domain"
										className="select select-bordered"
									>
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
									<select
										defaultValue={data.available}
										name="available"
										className="select select-bordered"
									>
										<option>true</option>
										<option>false</option>
									</select>
								</div>
							</div>
							<div className="flex items-center justify-center gap-4">
								<div className="form-control">
									<label className="label">
										<span className="label-text">Avatar</span>
									</label>
									<input
										defaultValue={data.avatar}
										name="avatar"
										type="text"
										placeholder="Avatar URL"
										className="input input-bordered"
										required
									/>
								</div>
								<div className="form-control">
									<label className="label">
										<span className="label-text">Email</span>
									</label>
									<input
										defaultValue={data.email}
										name="email"
										type="email"
										placeholder="Email"
										className="input input-bordered"
										required
									/>
								</div>
							</div>
							<div className="form-control col-span-2 mt-6">
								<input
									className="btn btn-primary"
									type="submit"
									value="update User"
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateUser;
