import React, { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Requests from '../../api/ApiList';
import { useNavigate } from 'react-router-dom';
import Switcher10 from './Switcher10';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../redux/cartSlices';
import { Dialog, Transition } from '@headlessui/react';

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [userType, setUserType] = useState(false);

	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(false);
	}
	const onSubmit = (data) => {
		data = { ...data, senior: userType };

		if (data.phone.length !== 10) {
			toast.warning('Please enter 10 digit Phone Number!', {
				style: {
					background: '#1e3257',
					margin: '7px',
					borderRadius: '7px',
					color: 'white',
					border: '1px solid gray',
				},
			});
		}

		if (data.cpassword === data.password && data.password.length > 6) {
			toast.loading('Please wait', {
				style: {
					background: '#1e3257',
					margin: '7px',
					borderRadius: '7px',
					color: 'white',
					border: '1px solid gray',
				},
			});
			delete data.cpassword;
			data = { ...data, register: '' };

			Requests.register(data)
				.then((res) => {
					localStorage.setItem('token', res.data.access);
					toast.dismiss();
					toast.success('Registered Successfully !', {
						style: {
							background: '#1e3257',
							margin: '7px',
							borderRadius: '7px',
							color: 'white',
							border: '1px solid gray',
						},
					});
					// openModal();
					navigate('/');
					dispatch(setLogin());
				})
				.catch((err) => {
					toast.dismiss();
					// console.log(err);
					const msg = err.response.data;
					// console.log(msg);
					if (msg?.message?.username) {
						toast.warning(msg.message.username[0], {
							style: {
								background: '#1e3257',
								margin: '7px',
								borderRadius: '7px',
								color: 'white',
								border: '1px solid gray',
							},
						});
					} else if (msg[0]) {
						toast.error(err.response.data[0], {
							style: {
								background: '#1e3257',
								margin: '7px',
								borderRadius: '7px',
								color: 'white',
								border: '1px solid gray',
							},
						});
					} else if (msg.password) {
						toast.warning(msg.password[0], {
							style: {
								background: '#1e3257',
								margin: '7px',
								borderRadius: '7px',
								color: 'white',
								border: '1px solid gray',
							},
						});
					} else if (msg) {
						toast.error(msg, {
							style: {
								background: '#1e3257',
								margin: '7px',
								borderRadius: '7px',
								color: 'white',
								border: '1px solid gray',
							},
						});
					} else {
						toast.error('There was an error while Registration!', {
							style: {
								background: '#1e3257',
								margin: '7px',
								borderRadius: '7px',
								color: 'white',
								border: '1px solid gray',
							},
						});
					}
				});
		} else {
			toast.warning('Passwords do not match or password is too short!', {
				style: {
					background: '#1e3257',
					margin: '7px',
					borderRadius: '7px',
					color: 'white',
					border: '1px solid gray',
				},
			});
		}
	};

	return (
		<div className="bg-gradient-to-t from-[#09203f] to-[#173b57] shadow-xl border-2 border-blue-950 rounded-md">
			<div className="md:w-[80%] flex flex-col justify-evenly mx-auto sm:w-[60%]">
				<h2 className="p-2 py-4 text-xl text-blue-400">Register Here</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="h-[80%] sm:w-[100%] mx-auto">
					<div className="flex justify-between gap-2 mx-auto my-1 w-[90%]">
						<input
							{...register('first_name', { maxLength: 20 })}
							id="Uname"
							className="font-[Poppins] bg-sky-950 border text-blue-100 border-slate-600  sm:text-sm rounded-lg focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  placeholder:text-[1.00rem]"
							required
							placeholder="First Name"
						/>
						<input
							{...register('last_name', { maxLength: 20 })}
							id="pass"
							required
							className="bg-sky-950 border text-blue-100  placeholder:text-[1.00rem] border-slate-600   sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-[Poppins]"
							placeholder="Last Name"
						/>
					</div>
					<div className="my-3">
						<input
							{...register('username', { maxLength: 15 })}
							placeholder="Username"
							className="font-[Poppins] bg-sky-950 text-blue-100  placeholder:text-[1.00rem] border mx-auto border-slate-600   sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						/>
					</div>
					<div className="my-3">
						<input
							{...register('email', {
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: 'Invalid email format',
								},
							})}
							placeholder="Email"
							type="email"
							className="font-[Poppins] bg-sky-950 border text-blue-100 mx-auto border-slate-600   sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  placeholder:text-[1.00rem]"
							required
						/>
					</div>
					<div className="my-3">
						<input
							{...register('phone', {
								pattern: {
									// value: /^\d{10}$/,
									message: 'Phone number must be exactly 10 digits long.',
								},
							})}
							maxLength="10"
							placeholder="Phone"
							type="tel"
							className="font-[Poppins] bg-sky-950 border text-blue-100 mx-auto border-slate-600   sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  placeholder:text-[1.00rem]"
							required
						/>
					</div>
					<div className="my-3">
						<input
							{...register('institute')}
							placeholder="Institute"
							className="font-[Poppins] bg-sky-950 border text-blue-100  placeholder:text-[1.00rem] mx-auto border-slate-600   sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						/>
					</div>

					{/* <div className="my-3">
						<input
							{...register('referralCode')}
							placeholder="Referal Code (If any)"
							className="font-[Poppins] bg-sky-950 border text-blue-100 border-slate-600   sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-blue-600 mx-auto  placeholder:text-[1.00rem] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						/>
					</div> */}
					<div className="my-3">
						<input
							{...register('password')}
							placeholder="Password"
							type="password"
							className="bg-sky-950 text-blue-100  placeholder:text-[1.00rem] border mx-auto border-slate-600   sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-[Poppins]"
							required
						/>
					</div>
					<div className="my-3">
						<input
							{...register('cpassword')}
							placeholder="Confirm Password"
							type="password"
							required
							className="w-[90%]  placeholder:text-[1.00rem] mx-auto bg-sky-950 border text-blue-100 border-slate-600   sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block p-2.5 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-[Poppins]"
						/>
					</div>
					<div className="flex flex-row justify-between w-[100%]">
						<div className="my-1">
							<button
								type="submit"
								id="sub"
								className="p-2 px-3 m-2 border-2 rounded-md text-slate-400 hover:text-white focus:border-green-500 hover:border-blue-500 border-sky-200 bg-sky-950 ">
								Next
							</button>
						</div>
						<div className="flex items-center my-1">
							<Switcher10 onCheckboxChange={setUserType} />
						</div>
					</div>
				</form>
				<div>
					<Transition appear show={isOpen} as={Fragment}>
						<Dialog as="div" className="relative z-10" onClose={closeModal}>
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0">
								<div className="fixed inset-0 bg-black/25" />
							</Transition.Child>

							<div className="fixed inset-0 overflow-y-auto">
								<div className="flex items-center justify-center min-h-full p-4 text-center">
									<Transition.Child
										as={Fragment}
										enter="ease-out duration-300"
										enterFrom="opacity-0 scale-95"
										enterTo="opacity-100 scale-100"
										leave="ease-in duration-200"
										leaveFrom="opacity-100 scale-100"
										leaveTo="opacity-0 scale-95">
										<Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-blue-950 rounded-2xl">
											<Dialog.Title
												as="h3"
												className="text-lg font-medium leading-6 text-blue-300 font-[AzonixRegular]">
												Verify Email
											</Dialog.Title>
											<div className="mt-2">
												<p className="font-[Poppins] text-sm text-slate-300">
													Your email verification is initiated. We’ve sent you
													an email for verifications.
												</p>
											</div>

											<div className="mt-4">
												<button
													type="button"
													className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:text-white hover:bg-sky-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
													onClick={closeModal}>
													Got it!
												</button>
											</div>
										</Dialog.Panel>
									</Transition.Child>
								</div>
							</div>
						</Dialog>
					</Transition>
				</div>
			</div>
		</div>
	);
};

export default Register;
