'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import './tabs.css'

const Tabs = ({
	tabs: propTabs,
	containerClassName,
	activeTabClassName,
	tabClassName,
	contentClassName,
}) => {
	const [active, setActive] = useState(propTabs[0]);
	const [tabs, setTabs] = useState(propTabs);

	const moveSelectedTabToTop = (idx) => {
		const newTabs = [...propTabs];
		const selectedTab = newTabs.splice(idx, 1);
		newTabs.unshift(selectedTab[0]);
		setTabs(newTabs);
		setActive(newTabs[0]);
	};

	const [hovering, setHovering] = useState(false);

	return (
		<>
			<div
				className={cn(
					'flex flex-row items-center justify-around  shadow-2xl bg-slate-800 rounded-xl p-2  [perspective:1000px] relative  sm:overflow-visible no-visible-scrollbar  max-w-full w-full',
					containerClassName
				)}>
				{propTabs.map((tab, idx) => (
					<button
						key={tab.title}
						onClick={() => {
							moveSelectedTabToTop(idx);
						}}
						onMouseEnter={() => setHovering(true)}
						onMouseLeave={() => setHovering(false)}
						className={cn('tabss relative sm:w-1/4 md:w-1/3 px-4 py-2 rounded-xl', tabClassName)}
						style={{
							transformStyle: 'preserve-3d',
						}}>
						{active.value === tab.value && (
							<motion.div
								layoutId="clickedbutton"
								transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
								className={cn(
									'absolute inset-0 bg-sky-800 border-2 border-blue-400 rounded-lg ',
									activeTabClassName
								)}
							/>
						)}

						<span className="tabss relative block text-xs md:text-2xl text-white">
							{tab.title}
						</span>
					</button>
				))}
			</div>
			<FadeInDiv
				tabs={tabs}
				active={active}
				key={active.value}
				hovering={hovering}
				className={cn('mt-10', contentClassName)}
			/>
		</>
	);
};

export const FadeInDiv = ({ className, tabs, hovering }) => {
	const isActive = (tab) => {
		return tab.value === tabs[0].value;
	};
	return (
		<div className="relative w-full h-full">
			{tabs.map((tab, idx) => (
				<motion.div
					key={tab.value}
					layoutId={tab.value}
					style={{
						scale: 1 - idx * 0.1,
						top: hovering ? idx * -50 : 0,
						zIndex: -idx,
						opacity: idx < 3 ? 1 - idx * 0.1 : 0,
					}}
					animate={{
						y: isActive(tab) ? [0, 40, 0] : 0,
					}}
					className={cn('w-full h-full absolute top-0 left-0', className)}>
					{tab.content}
				</motion.div>
			))}
		</div>
	);
};
export default Tabs;
