import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

const NotFound = () => {
	return (
		<section className="flex h-full flex-col items-center justify-center gap-4">
			<h1 className="">This page doesn't exist.</h1>

			<Link href="/" className={`w-fit ${buttonVariants()}`}>
				Go home
			</Link>
		</section>
	);
};

export default NotFound;
