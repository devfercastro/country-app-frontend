"use client";

import type { APICountriesList } from "../common/definitions";

export default function Navbar({
	groups,
}: {
	groups: Record<string, { groupId: string; countriesList: APICountriesList }>;
}) {
	const HEADER_HEIGHT = 180;

	const scrollToGroup = (groupId: string) => {
		const element = document.getElementById(groupId);
		if (element) {
			// Calculate the top position of the element, adjusting for the header height
			const elementPosition =
				element.getBoundingClientRect().top + window.scrollY;
			const offsetPosition = elementPosition - HEADER_HEIGHT;

			// Scroll to the position with smooth behavior
			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	};

	return (
		<nav className="fixed top-0 right-0 h-screen max-w-20 bg-slate-900 w-24">
			<div className="flex flex-col justify-between py-2 items-center h-full">
				{groups &&
					Object.keys(groups).map((initial) => {
						const group = groups[initial];
						return (
							<button
								type="button"
								key={group.groupId}
								onClick={() => scrollToGroup(group.groupId)}
								className="font-semibold text-center hover:decoration-2 hover:underline hover:text-2xl"
							>
								{initial.toUpperCase()}
							</button>
						);
					})}
			</div>
		</nav>
	);
}
