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
		<nav className="flex flex-row justify-center items-center w-full">
			<div className="flex flex-row gap-x-4">
				{groups &&
					Object.keys(groups).map((initial) => {
						const group = groups[initial];
						return (
							<button
								type="button"
								key={group.groupId}
								onClick={() => scrollToGroup(group.groupId)}
								className="bg-slate-900 rounded-lg p-4 font-semibold text-center hover:bg-slate-50 hover:text-black"
							>
								{initial.toUpperCase()}
							</button>
						);
					})}
			</div>
		</nav>
	);
}
