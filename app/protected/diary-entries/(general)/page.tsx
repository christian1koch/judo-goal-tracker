import { getAllDiaryEntries } from "@/app/actions";
import { BentoGridItem } from "@/components/bento-grid";
import { DiaryEntriesBentoGrid } from "@/components/diary-entries/components/diary-entries-bento-grid";
import { IconNote, IconNotebook } from "@tabler/icons-react";
// import { Icon12Hours } from "@tabler/icons-react";
import Link from "next/link";

export default async function Page() {
	const diaryEntries = await getAllDiaryEntries();
	const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);
	return (
		<>
			{!diaryEntries || diaryEntries.length === 0 ? (
				<div>
					No Diary Entries found, Create a new diary entries to start
				</div>
			) : (
				<DiaryEntriesBentoGrid>
					{diaryEntries.map((n) => (
						<BentoGridItem
							className="min-h-60"
							key={n.id}
							header={
								<div
									className="w-full h-full relative rounded-xl"
									style={{
										backgroundColor: "#" + randomColor(),
									}}
								>
									<Link
										className="absolute w-full h-full top-0 left-0	 "
										href={`./diary-entries/edit/${n.id}`}
									>
										<IconNotebook className="absolute w-full h-full top-0 left-0 bg-black opacity-40 transition-opacity duration-300 hover:opacity-20 " />
									</Link>
								</div>
							}
							title={n.title || "Untitled Note"}
							description={n.date}
						/>
					))}
				</DiaryEntriesBentoGrid>
			)}
		</>
	);
}
