"use client";

import type { APICountriesList } from "../common/definitions";

export default function Navbar({
	groups,
}: {
	groups: Record<string, { groupId: string; countriesList: APICountriesList }>;
}) {
	const offset = 100;

	const scrollToGroup = (groupId: string) => {
		const element = document.getElementById(groupId);
		if (element) {
			const elementPosition =
				element.getBoundingClientRect().top + window.scrollY;
			const offsetPosition = elementPosition - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	};

	return (
		<nav className="fixed top-0 right-0 h-screen bg-slate-900 w-10 md:w-18">
			<div className="flex flex-col justify-between py-2 items-center h-full">
				{groups &&
					Object.keys(groups).map((initial) => {
						const group = groups[initial];
						return (
							<button
								type="button"
								key={group.groupId}
								onClick={() => scrollToGroup(group.groupId)}
								className="font-semibold text-center rounded-md w-full h-full hover:decoration-2 hover:underline hover:text-2xl active:bg-black"
							>
								{initial.toUpperCase()}
							</button>
						);
					})}
			</div>
		</nav>
	);
}
