import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyTeam = () => {
	const [teams, setTeams] = useState([]);

	useEffect(() => {
		fetch(`https://backend-alpha-lovat.vercel.app/team`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setTeams(data);
			});
	}, []);

	return (
		<div>
			<div className="flex items-center justify-center gap-5 my-3">
				<Link to="/" className="btn bg-gray-700 rounded-md">
					Back to Home
				</Link>
				<h2 className="text-center text-3xl font-serif font-bold">My Team</h2>
			</div>
			{teams.length === 0 ? (
				<h1 className="text-center text-3xl font-serif mt-10">
					Select user to make a team
				</h1>
			) : (
				<div className="w-full mx-auto mt-10 font-serif grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
					{teams.map((member) => (
						<div
							key={member._id}
							className="card bg-base-100 shadow-xl border border-white"
						>
							<figure className="bg-[#b5dcf2] my-3 h-20 w-20 rounded-full mx-auto">
								<img src={member.avatar} alt="profile" />
							</figure>
							<div className="card-body">
								<h2 className="card-title">
									{member.first_name} {member.last_name}
								</h2>
								<div className="badge badge-primary bg-cyan-500 text-black text-xs border-none">
									{member.domain}
								</div>
								<p>Email : {member.email}</p>
								<p>Gender : {member.gender}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default MyTeam;
