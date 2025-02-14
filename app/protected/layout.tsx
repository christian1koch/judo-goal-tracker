import { MainSidebar } from "@/components/main-sidebar";
import { Navbar } from "@/components/navbar";

export default async function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			<div className="flex">
				<MainSidebar />
				<div className="flex justify-center flex-1 md:pl-16">
					{children}
				</div>
			</div>
		</>
	);
}
