import { getAllDiaryEntries } from "@/app/actions";
import { BentoGridItem } from "@/components/bento-grid";
import { DiaryEntriesBentoGrid } from "@/components/diary-entries/components/diary-entries-bento-grid";
// import { Icon12Hours } from "@tabler/icons-react";
import Link from "next/link";

export default async function Page() {
	const diaryEntries = await getAllDiaryEntries();

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
							key={n.id}
							header={n.title}
							title={
								<Link href={`./diary-entries/edit/${n.id}`}>
									Go to diary entry
								</Link>
							}
							description={n.date}
						/>
					))}
				</DiaryEntriesBentoGrid>
			)}
		</>
	);
}
