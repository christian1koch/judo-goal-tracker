import Image from "next/image";
import { Container } from "@/components/landing-page/Container";
import judoPic from "../../public/img/Judo pic.png";
import { Button, Link } from "@heroui/react";

export const Hero = () => {
	return (
		<>
			<Container className="flex flex-wrap ">
				<div className="flex items-center w-full lg:w-1/2">
					<div className="max-w-2xl mb-8">
						<h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
							Judoapp: Create goals, achieve goals.
						</h1>
						<p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
							Take notes everytime after training to help you
							think and keep track of your goals.
						</p>

						<div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
							<div className="flex gap-2">
								<Button
									as={Link}
									size="lg"
									href="/sign-up"
									variant="solid"
									color="success"
								>
									Sign up
								</Button>
								<Button
									as={Link}
									size="lg"
									variant="light"
									href="/sign-in"
								>
									Sign in
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center w-full lg:w-1/2">
					<div className="">
						<Image
							src={judoPic}
							width="616"
							height="617"
							// className={"object-cover"}
							className="mix-blend-screen"
							alt="Hero Illustration"
							loading="eager"
							placeholder="blur"
						/>
					</div>
				</div>
			</Container>
		</>
	);
};
