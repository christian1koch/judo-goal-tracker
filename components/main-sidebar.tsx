"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./sidebar";
import {
	Icon12Hours,
	IconBrandTabler,
	IconLogout,
	IconNotes,
	IconTargetArrow,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function MainSidebar() {
	const links = [
		{
			label: "Dashboard",
			href: "/protected",
			icon: <IconBrandTabler className=" h-5 w-5 flex-shrink-0" />,
		},
		{
			label: "Goals",
			href: "/protected/goals",
			icon: <IconTargetArrow className=" h-5 w-5 flex-shrink-0" />,
		},
		{
			label: "Notes",
			href: "/protected/notes",
			icon: <IconNotes className=" h-5 w-5 flex-shrink-0" />,
		},
		{
			label: "Log out",
			href: "/sign-out",
			icon: <IconLogout className=" h-5 w-5 flex-shrink-0" />,
		},
	];
	const [open, setOpen] = useState(false);
	return (
		<div className="relative">
			<Sidebar open={open} setOpen={setOpen} animate={true}>
				<SidebarBody className="justify-between gap-10 fixed self-start border-r border-default-300 h-[calc(100vh-64px)]">
					<div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
						<>
							<Logo />
						</>
						<div className="mt-8 flex flex-col gap-2">
							{links.map((link, idx) => (
								<SidebarLink key={idx} link={link} />
							))}
						</div>
					</div>
					<div>
						<SidebarLink
							link={{
								label: "Test",
								href: "#",
								icon: <Icon12Hours />,
							}}
						/>
					</div>
				</SidebarBody>
			</Sidebar>
		</div>
	);
}
export const Logo = () => {
	return (
		<Link
			href="#"
			className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
		>
			<div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="font-medium text-black dark:text-white whitespace-pre"
			>
				Judo App
			</motion.span>
		</Link>
	);
};
export const LogoIcon = () => {
	return (
		<Link
			href="#"
			className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
		>
			<div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
		</Link>
	);
};
