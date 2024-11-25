import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import ContactProfileCard from '../../components/cards/ContactProfileCard';
import { BackgroundGradient } from '../../components/ui/background-gradient';
import { TypewriterEffectSmoothDemo } from '../../components/cards/TextGenerateEffectCard';
import { v4 as uuidv4 } from 'uuid';
import Carousel from '../../components/Carousel';
import Typewriter from 'typewriter-effect';
import './Sponsors.css';
import imgdh from '../../assets/admin-photos/dhruvgoplani.jpg';
import Card from '../../components/cards/ProfileCard';
import imgpb from '../../assets/admin-photos/Pranavb.jpg';
import imgpr from '../../assets/admin-photos/Premdeshmukh.jpeg';
import { useWindowSize } from 'react-use';
import Footer from '../../components/Footer';
import fetchai from '../../assets/sponsorlogos/Primary logo_brand-gradient copy.png'
import ims from '../../assets/sponsorlogos/ims.jpg'
import pizzeria from '../../assets/sponsorlogos/pizzeria.jpg'
import nescafe from '../../assets/sponsorlogos/nescafe.jpg'
import ritik from '../../assets/sponsorlogos/ritik.jpg'
const Sponsors = () => {
	const { width } = useWindowSize();
	const [pages, setPages] = useState(3);
	const [offset, setOffset] = useState(2);
	useEffect(() => {
		// Update pages and offset values based on screen width
		if (width < 425) {
			setPages(3.9); // Set pages value for small screens
			setOffset(2.5);
		} else {
			setPages(2); // Set pages value for larger screens
			setOffset(2.5); // Set offset value for larger screens
		}
	}, [width]); // Update whenever width changes

	let cards = [
		{
			key: uuidv4(),
			content: <Card imagen={imgdh} name={'Dhruv Goplani'} />,
		},
		{
			key: uuidv4(),
			content: <Card imagen={imgpr} name={'Prem Deshmukh'} />,
		},
		{
			key: uuidv4(),
			content: <Card imagen={imgpb} name={'Pranav Bhiungade'} />,
		},
	];
	return (
		<div className="">
			<div className="sponsors -z-10 ">
				<Parallax
					pages={pages}
					style={{ top: '0', left: '0' }}
					className="animation3  bg-[#032648] h-[fit-content] [&::-webkit-scrollbar]:[width:2px]">
					<ParallaxLayer offset={0} speed={0.25}>
						<div
							className="animation_layer parallax3 h-[1400px]"
							id="bgspons"></div>
					</ParallaxLayer>
					{/* <ParallaxLayer offset={0} speed={0.50}>
          <div className="animation_layer parallax3" id="bubbles"></div>
        </ParallaxLayer> */}
					<ParallaxLayer offset={0} speed={0.3}>
						<div className="animation_layer parallax3" id="layers0"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={-0.1}>
						<div className="animation_layer parallax3" id="layers1"></div>
					</ParallaxLayer>

					<ParallaxLayer offset={0} speed={0.3}>
						<div className="animation_layer parallax3" id="layers2"></div>
					</ParallaxLayer>

					<ParallaxLayer offset={0} speed={0.35}>
						<div className="animation_layer parallax3" id="layers3"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={-0.1}>
						<div className="flex items-start justify-center font-extrabold text-center text-blue-200 align-middle animation_layer parallax3 mt-[10rem] sm:mt-24 md:mt-12 lg:mt-8 text-5xl sm:text-8xl md:text-7xl lg:text-9xl">
							<p className="mt-[20%]">Sponsors</p>
						</div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.5}>
						<div className="animation_layer parallax3" id="layers4"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.45}>
						<div className="animation_layer parallax3" id="layers5"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.4}>
						<div className="animation_layer parallax3" id="layers6"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.35}>
						<div className="animation_layer parallax3" id="layers7"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.35}>
						<div className="animation_layer parallax3" id="layers8"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.35}>
						<div className="animation_layer parallax3" id="layers9"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.35}>
						<div className="animation_layer parallax3" id="layers10"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.35}>
						<div className="animation_layer parallax3" id="layers11"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0} speed={0.35}>
						<div className="animation_layer parallax3" id="layers12"></div>
					</ParallaxLayer>
					<ParallaxLayer offset={0.98} speed={0.25}>
						<div className='flex justify-center text-white text-4xl'><p>Title Sponsor</p></div>
						<LazyLoadImage
				src={fetchai}
				alt="Fetch Ai"
				width="500"
				height="500"
				className="mx-auto my-5"
			/>
						{/* <div className="p-10 m-10 text-sm font-extrabold text-center border border-blue-300 md:text-5xl text-sky-300 rounded-2xl">
							<Typewriter
								options={{
									loop: true,
								}}
								onInit={(typewriter) => {
									typewriter
										.typeString('We are Open for Sponsorships')
										.pauseFor(400)
										.deleteAll()
										.typeString('Contact us')
										.pauseFor(400)
										.deleteAll()
										.start();
								}}
							/>
						</div> */}
						{/* <div className="flex-col m-10 "> */}
							{/* <div className="text-xl font-extrabold text-center text-white md:text-2xl lg:text-3xl">
								Finance Team
							</div> */}
							{/* <div className="flex items-center gap-5 mt-10 justify-evenly cardb">
								<Card
									className=""
									name={'Prem Deshmukh'}
									// posit={'Treasure'}
									imagen={imgpr}></Card>
								<Card
									className=""
									name={'Dhruv Goplani'}
									mailid={'dhruvgoplani00@gmail.com'}
									lknid={
										'https://www.linkedin.com/in/dhruv-goplani-618b77243?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
									}
									// posit={'Marketing Head'}
									imagen={imgdh}></Card>
								<Card
									className=""
									name={'Pranav Bhiungade'}
									// posit={'Secretary of Finance'}

									imagen={imgpb}></Card>
							</div> */}
							{/* <div className='flex mr-20 md:hidden oldd '>
						   <Carousel cards={cards} height="500px" width="100%"/>
	                   </div> */}
						{/* </div> */}
					</ParallaxLayer>
					<ParallaxLayer offset={1.1} speed={0.25}>
						<div className='flex justify-center text-white text-4xl'><p>Education Sponsor</p></div>
						<LazyLoadImage
				src={ims}
				alt="IMS"
				width="300"
				height="300"
				className="mx-auto my-5"
			/>

					</ParallaxLayer>
					<ParallaxLayer offset={1.8} speed={0.25}>
						<div className='flex justify-center text-white text-4xl'><p>Food Sponsor</p></div>
						<LazyLoadImage
				src={pizzeria}
				alt="Pizzeria"
				width="300"
				height="300"
				className="mx-auto my-5"
			/>

					</ParallaxLayer>
					<ParallaxLayer offset={2.2} speed={0.25}>
						<div className='flex justify-center text-white text-4xl'><p>Beverage Sponsor</p></div>
						<LazyLoadImage
				src={nescafe}
				alt="Pizzeria"
				width="300"
				height="300"
				className="mx-auto my-5"
			/>

					</ParallaxLayer>
					{/* <ParallaxLayer offset={2} style={{ marginTop: 200, }} speed={1}>
 
      </ParallaxLayer> */}
				</Parallax>
			</div>
			<Footer />
		</div>
	);
};

export default Sponsors;
