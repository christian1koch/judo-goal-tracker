import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { IconNote, IconNotebook, IconRocket } from "@tabler/icons-react";
import Link from "next/link";

export default async function ProtectedPage() {
	return (
		<BentoGrid className="md:auto-rows-auto p-4">
			<BentoGridItem
				title="Notes"
				description="Keep all your judo knowledge in one place!"
				className="md:col-span-3"
				header={
					<div className="w-full h-full relative rounded-xl bg-cyan-300">
						<Link
							className="absolute w-full z-20 h-full top-0 left-0	 "
							href="/protected/notes"
						>
							<IconNote className="absolute w-full h-full top-0 left-0 bg-black opacity-40 z-10 transition-opacity duration-300 hover:opacity-20 " />
						</Link>
					</div>
				}
			/>
			<BentoGridItem
				title="Manage your goals"
				description="Add and manage your gols so you can reach them easier!"
				className="md:col-span-1"
				header={
					<div className="w-full h-full relative rounded-xl bg-primary-200">
						<Link
							className="absolute w-full z-20 h-full top-0 left-0	 "
							href="/protected/goals"
						>
							<IconRocket className="absolute w-full h-full top-0 left-0 bg-black opacity-40 z-10 transition-opacity duration-300 hover:opacity-20 " />
						</Link>
					</div>
				}
			/>
			<BentoGridItem
				title="Diary Entries"
				description="Keep a journal of everything that happened after a session"
				className="md:col-span-2"
				header={
					<div className="w-full h-full relative rounded-xl bg-success-200">
						<Link
							className="absolute w-full z-20 h-full top-0 left-0	 "
							href="/protected/diary-entries"
						>
							<IconNotebook className=" absolute w-full h-full top-0 left-0 bg-black opacity-40 z-10 transition-opacity duration-300 hover:opacity-20 " />
						</Link>
					</div>
				}
			/>
		</BentoGrid>
	);
}
