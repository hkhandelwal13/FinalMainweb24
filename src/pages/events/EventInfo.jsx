import { useState } from 'react';
import { Tab } from '@headlessui/react';
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const EventInfo = ({ data }) => {
	const { heading, body, structure, rules, id, ...otherDetails } = data;

	// Categories
	let quizCategories;
	if (typeof structure === 'object') {
		quizCategories = Object.values(structure);
	} else {
		quizCategories = structure;
	}

	const [sr, jr] = [...otherDetails.prizes];
	const contact = otherDetails.contact;

	// Info
	const DataInfo = () => {
		return (
			<div className="px-2 py-1 m-1 text-center text-md md:text-lg ">
				<p className="my-3 text-center font-[Poppins] !text-md">{body}</p>
				<div>
					<h2 className="text-lg font-semibold tracking-wider text-teal-200 py-1 w-[fit-content] border-b-2">
						Timings :
					</h2>
					<div>
						{otherDetails.datetime.map((item, idx) => (
							<p key={idx}>{item}</p>
						))}
					</div>
				</div>
				<div className="my-1">
					<h2 className="p-1 font-semibold tracking-wider text-teal-200 py-1 w-[fit-content] border-b-2">
						Prizes :
					</h2>
					<div className="px-4 m-1">
						<p>{sr[1]}</p>
						<p>{sr[2]}</p>
					</div>
					{jr ? (
						<div>
							<p>{jr[1]}</p>
							<p>{jr[2]}</p>
						</div>
					) : (
						''
					)}
				</div>
			</div>
		);
	};
	// Contact
	const DataContact = () => {
		return (
			<div className="z-10 w-[100%] h-[100%] flex flex-col justify-center items-center">
				{contact.map((item, idx) => (
					<div key={idx * 0.01} className="m-2 text-center">
						<p className="p-1 ">{item.name}</p>
						<p className="p-1">{item.phone}</p>
					</div>
				))}
			</div>
		);
	};
	// Categories
	const [categories] = useState({
		Info: [<DataInfo />],
		Rules: [
			<div className="flex flex-col px-2 py-1">
				{Object.values(rules).map((itm, index) => {
					return (
						<div className="flex flex-row m-2" key={index * 0.1}>
							{id !== 111 ? (
								<p className="px-2 pt-1 font-semibold text-justify">
									{index + 1}.
								</p>
							) : (
								''
							)}
							<pre className="p-1 font-[Poppins]">{itm}</pre>
						</div>
					);
				})}
			</div>,
		],
		Structure: [
			<div
				className={`flex flex-col  p-2 ${
					id !== 111 ? 'items-center' : 'items-baseline'
				}`}>
				{typeof structure !== 'string' ? (
					quizCategories.map((itm, inx) => {
						return (
							<div
								className="flex my-2 text-wrap"
								key={inx * Math.random(0, 1)}>
								{id !== 111 && id !== 108 ? (
									<>
										<p className="px-2 pt-1 font-semibold text-left">
											{inx + 1}.
										</p>
										<p className={'p-1 '}>{itm}</p>
									</>
								) : (
									<pre className="p-1 text-balance font-[Poppins]">{itm}</pre>
								)}
							</div>
						);
					})
				) : (
					<div className={'px-2 my-2 text-cente'}>{structure}</div>
				)}
				{id === 110 ? (
					<div>
						<p className="py-1">
							3. To View the problem statements, visit{' '}
							<a
								href=" https://drive.google.com/file/d/1j4a28lEqS1tdbqAz7QZsXBZtABA56oWv/view?usp=sharing"
								className="text-blue-400 underline underline-blue-500">
								 https://drive.google.com/file/d/1j4a28lEqS1tdbqAz7QZsXBZtABA56oWv/view?usp=sharing
							</a>
						</p>
						<p className="py-1">
							4. Submit your ideas here :
							<a
								href="https://unstop.com/o/uv4cKVr?lb=aCmVWhXh"
								className="text-blue-400 underline underline-blue-500">
								https://unstop.com/o/uv4cKVr?lb=aCmVWhXh
							</a>
						</p>
					</div>
				) : (
					''
				)}
			</div>,
		],
		Contact: [<DataContact />],
	});

	return (
		<div className="w-full px-0 md:px-2 mb-2 font-[K2D] !text-md">
			{data ? (
				<Tab.Group>
					<Tab.List className="flex p-1 space-x-1 *:rounded-lg bg-blue-900/20 ">
						{data ? (
							Object.keys(categories).map((category) => (
								<Tab
									key={category}
									className={({ selected }) =>
										classNames(
											'w-[80%] rounded-lg py-2 md:text-lg text-md font-[K2D] leading-5',
											'ring-white/60 select-none focus:outline-none ',
											selected
												? 'bg-sky-950 text-white border-2 border-teal-700 shadow'
												: 'text-blue-100 hover:bg-white/[0.12]  hover:text-white'
										)
									}>
									<p
										className={({ selected }) =>
											classNames(selected ? 'bg-red-400' : 'bg-black')
										}>
										{category}
									</p>
								</Tab>
							))
						) : (
							<Loader />
						)}
					</Tab.List>
					<Tab.Panels className="mt-2 sm:max-h-[340px]">
						{Object.values(categories).map((posts, idx) => (
							<Tab.Panel
								key={Math.random()}
								className={classNames(
									'select-none rounded-xl bg-transparent md:h-[300px] sm:h-[270px] overflow-hidden',
									'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none '
								)}>
								<div
									key={Math.random() * 1.5}
									className="flow m-auto overflow-scroll h-[300px] [&::-webkit-scrollbar]:[width:2px] [&::-webkit-scrollbar]:[height:2px]
									[&::-webkit-scrollbar-thumb]:bg-blue-300 md:text-lg text-sm text-blue-100 mb-2 md:px-4 sm:px-1
									 post rounded-none">
									{posts}
								</div>
							</Tab.Panel>
						))}
					</Tab.Panels>
				</Tab.Group>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default EventInfo;
