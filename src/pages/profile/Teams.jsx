import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import ProfileContext from '../../utils/profileContext/ProfileContext';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Requests from '../../api/ApiList';
import Logo from './../../images/Images';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const MyTeam = () => {
	const profile = useContext(ProfileContext);
	const [teamInfo, setTeamInfo] = useState([]);
	const [loading, setLoading] = useState(true);

	// console.log(teamInfo);

	const copyToClipboard = (data) => {
		navigator.clipboard.writeText(data);
		toast.success(`Copied to Clipboard!`);
	};

	useEffect(() => {
		const fetchTeamInfo = async () => {
			try {
				const response = await Requests.viewTeam();
				setTeamInfo(response.data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching team information:', error);
				setLoading(false);
			}
		};

		fetchTeamInfo();
	}, []);

	return (
		<div>
			{loading ? (
				<div>Loading...</div>
			) : !teamInfo.length ? (
				<div className="mx-8 my-4 text-xl font-semi">No Team Created</div>
			) : (
				<div className="max-h-[400px]">
					{teamInfo.map((team) => (
						<div
							key={team.id}
							className="flex flex-col justify-between p-2 max-h-[] mx-auto font-[Poppins] border-2 rounded-lg sm:flex-row mb-4 border-violet-300">
							<div className="flex items-center py-2 mx-2 my-auto border-b-2 md:border-none md:flex-col">
								<p className="text-center text-cyan-200">
									{team.event.event_name}
								</p>
								<img
									src={Logo[team.event.event_id]}
									alt="Logo"
									width="70px"
									height="70px"
									className="mx-auto bg-black"
								/>
								<div className="px-2 text-center">
									<pre>{`Max Team Size:`}</pre>
									<p> {team.event.group_size}</p>
								</div>
							</div>
							<div className="h-[revert] -mx-2 flex  justify-evenly font-[Poppins] text-slate-200 text-center md:border-l-2 border-slate-400 border-b-2 md:border-none md:flex-col">
								<div className="w-[100%] grid grid-cols-2 grid-row-3 h-[100%] items-center">
									<h2 className="px-1 text-blue-400">Name :</h2>
									<p>{team.team_name}</p>
									<p className="text-center text-blue-400 border-blue-600 border-1">
										{'Team \nID :'}
									</p>
									<div className="flex flex-col items-center justify-center px-1">
										<button
											className="px-2 border-b-2 border-blue-400 hover:text-slate-500"
											onClick={() => copyToClipboard(team.team_id)}>
											{team.team_id}
										</button>
									</div>
									<p className="text-center text-blue-400">
										{'Team \nPassword :'}
									</p>
									<div className="flex flex-col items-center">
										<button
											onClick={() => copyToClipboard(team.team_password)}
											className="px-3 border-b-2 border-blue-400 hover:text-slate-500">
											{team.team_password}
										</button>
									</div>
								</div>
							</div>
							<div className="md:w-[40%] md:border-l-2 p-2 flex flex-row justify-between items-center mx-2 border-slate-400 border-b-2 md:border-none md:flex-col">
								<div className="flex flex-col justify-evenly h-[100%]">
									<h2 className="text-lg text-center text-cyan-400">
										Team Members
									</h2>
									<ol className="text-left">
										{team.user.map((user, idx) => (
											<li key={user.email} className="flex flex-row p-1">
												<p className="px-1">{idx + 1}.</p>
												<p>{user.username}</p>
											</li>
										))}
									</ol>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

const JoinTeam = () => {
	const { register, handleSubmit, formState: errors } = useForm();
	const onJoinTeam = (data) => {
		toast.info('Please wait...', {
			style: {
				background: '#1e3257',
				margin: '7px',
				borderRadius: '7px',
				color: 'white',
				border: '1px solid gray',
			},
		});
		Requests.joinTeam(data)
			.then((res) => {
				toast.dismiss();
				if (res.data.message === 'User added to Team') {
					toast.success('Joined Successfully', {
						style: {
							background: '#1e3257',
							margin: '7px',
							borderRadius: '7px',
							color: 'white',
							border: '1px solid gray',
						},
					});
				} else {
					toast.warning(res.data.message, {
						style: {
							background: '#1e3257',
							margin: '7px',
							borderRadius: '7px',
							color: 'white',
							border: '1px solid gray',
						},
					});
				}
			})
			.catch((err) => {
				toast.dismiss();
				toast.error(err.response.data.message, {
					style: {
						background: '#1e3257',
						margin: '7px',
						borderRadius: '7px',
						color: 'white',
						border: '1px solid gray',
					},
				});
			});
	};
	return (
		<div className="w-[100%] md:w-[64%] mx-auto gird items-center border-2 rounded-md border-violet-500 p-2">
			<form
				onSubmit={handleSubmit(onJoinTeam)}
				className="w-[100%] flex flex-col p-2 my-8 ">
				<label htmlFor="TeamName" className="w-[100%] mx-auto mt-4 text-lg">
					Enter Team Id
				</label>
				<input
					{...register('team_id', { maxLength: 15 })}
					placeholder="Team ID"
					className="bg-blue-950 text-lg py-3 font-semibold font-[Poppins] text-slate-100 border-none placeholder:text-[1.07rem] border mx-auto border-gray-300 sm:text-sm rounded-lg focus:outline-none focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700 block p-2 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-4  my-4 w-[100%]"
					required
				/>
				<button
					type="submit"
					className="mx-[35%] py-2 px-4 border-2 m-2 rounded-lg text-green-500 border-cyan-400 hover:text-cyan-50 hover:bg-blue-950">
					Join
				</button>
			</form>
		</div>
	);
};

const CreateTeam = () => {
	const navigate = useNavigate();
	const totalsum = useSelector((state) => state.cart.totalsum);
	const { register, handleSubmit, formState: errors } = useForm();
	const eventsList = [
		{ title: 'Clash', id: 101 },
		{ title: 'Reverse Coding', id: 102 },
		// { title: 'B-Plan', id: 105 },
		{ title: 'Enigma', id: 106 },
		{ title: 'Quizillionaire', id: 108 },
		{ title: 'Cretronix', id: 109 },
		{ title: 'Web Weaver', id: 110 },
		{ title: 'Roboliga', id: 111 },
	];

	const onCreateTeam = (data) => {
		// console.log(data);
		if (totalsum === 0) {
			toast.warning('Buy an event first!', {
				style: {
					background: '#1e3257',
					margin: '7px',
					borderRadius: '7px',
					color: 'white',
					border: '1px solid gray',
				},
			});
			navigate('/events');
		} else {
			if (data.event_id === 'Choose an Event') {
				toast.warning('Select an event first', {
					style: {
						background: '#1e3257',
						margin: '7px',
						borderRadius: '7px',
						color: 'white',
						border: '1px solid gray',
					},
				});
			} else {
				Requests.createTeam(data)
					.then((res) => {
						// console.log(res);
						if (
							res.data.message === 'No order exists for this user and event.'
						) {
							toast.info(res.data.message, {
								style: {
									background: '#1e3257',
									margin: '7px',
									borderRadius: '7px',
									color: 'white',
									border: '1px solid gray',
								},
							});
						} else if (
							res.data.message ===
							'Team already exists for this user and event.'
						) {
							toast.warning(res.data.message, {
								style: {
									background: '#1e3257',
									margin: '7px',
									borderRadius: '7px',
									color: 'white',
									border: '1px solid gray',
								},
							});
						} else {
							toast.info('Your team Id is ' + res.data.message, {
								style: {
									background: '#1e3257',
									margin: '7px',
									borderRadius: '7px',
									color: 'white',
									border: '1px solid gray',
								},
							});
							toast.success('Team created successfully!', {
								style: {
									background: '#1e3257',
									margin: '7px',
									borderRadius: '7px',
									color: 'white',
									border: '1px solid gray',
								},
							});
						}
					})
					.catch((err) =>
						toast.error('There was an error while creating team!')
					);
			}
		}
	};
	return (
		<form
			onSubmit={handleSubmit(onCreateTeam)}
			className="md:w-[70%] w-[100%] mx-auto px-2 h-[300px] flex flex-col justify-evenly border-2 rounded-md border-violet-500 my-4">
			<label
				htmlFor="TeamName"
				className="w-[80%] text-lg mx-auto text-slate-300">
				Enter Team Name
			</label>
			<input
				{...register('team_name', { minLength: 4 })}
				placeholder="Team Name"
				className="font-[Poppins] !bg-sky-900 placeholder:text-[1.07rem] border-2 mx-auto border-blue-800 px-4 sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block p-2 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[80%] border-none"
				required
			/>
			<label
				htmlFor="countries"
				className="block mx-auto text-lg dark:text-white w-[80%] text-slate-300">
				Select an option
			</label>
			<select
				{...register('event_id')}
				id="countries"
				className="font-[Poppins] bg-sky-900 text-slate-300 border border-gray-300 border-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 focus:ring-2 dark:focus:border-blue-500 font-semibold focus:outline-none"
				// required
			>
				<option selected>Choose an Event</option>
				{eventsList.map((events) => (
					<option value={events.id} key={events.id}>
						{events.title}
					</option>
				))}
			</select>
			<button
				type="submit"
				className="mx-[35%]  py-2 px-2 border-2 m-2 rounded-lg text-green-500 border-cyan-400 hover:text-cyan-50 hover:bg-blue-950">
				Create
			</button>
		</form>
	);
};

export default function Teams() {
	let [categories] = useState({
		My: [<MyTeam />],
		Create: [<CreateTeam />],
		Join: [<JoinTeam />],
	});

	return (
		<div className="w-full max-w-xl px-2 py-4 mx-auto sm:px-0">
			<Tab.Group>
				<Tab.List className="flex p-1 space-x-1 rounded-xl bg-blue-900/20">
					{Object.keys(categories).map((category) => (
						<Tab
							key={category}
							className={({ selected }) =>
								classNames(
									'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
									'ring-white/60 ring-offst-2 ring-offset-lue-400 focus:outline-none focus:ring-2',
									selected
										? 'bg-violet-950 text-blue-200 shadow'
										: 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
								)
							}>
							{category + ' Team'}
						</Tab>
					))}
				</Tab.List>
				<Tab.Panels className="mt-2 min-h-[300px] font-[Poppins] md:font-[AzonixRegular]">
					{Object.values(categories).map((posts, idx) => (
						<Tab.Panel
							key={idx * Math.random()}
							className={classNames(
								'rounded-xl bg-[#0f1b34] p-3 px-0 md:px-3 overflow-y-scroll [&::-webkit-scrollbar]:[width:1px] [&::-webkit-scrollbar]:[background:transparent]',
								'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring2'
							)}>
							{posts}
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}
