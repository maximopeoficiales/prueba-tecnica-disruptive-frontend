import { Navbar } from "@/components/Navbar";
import { Link } from "@nextui-org/link";

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex flex-col h-screen">
			<Navbar />
			<main className="container mx-auto max-w-7xl px-6 flex-grow pt-5">
				{children}
			</main>
			<footer className="w-full flex items-center justify-center py-3">
				<Link
					isExternal
					className="flex items-center gap-1 text-current"
					href="https://github.com/maximopeoficiales"
					title="github maximopeoficiales"
				>
					<span className="text-default-600">Powered by</span>
					<p className="text-primary">@maximopeoficiales</p>
				</Link>
			</footer>
		</div>
	);
}
