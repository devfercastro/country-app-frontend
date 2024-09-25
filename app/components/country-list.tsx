import type { APICountriesList } from "../common/definitions";
import CountryLink from "./country-link";

export default function CountryList({
	groups,
}: {
	groups: Record<string, { groupId: string; countriesList: APICountriesList }>;
}) {
	return (
		<div className="flex flex-col gap-y-12">
			{groups &&
				Object.keys(groups).map((initial) => (
					<div
						className="flex flex-col"
						id={`group${initial}`}
						key={`group${initial}`}
					>
						<p className="pl-12 font-bold mb-4 border-b-2">
							{initial.toUpperCase()}
						</p>
						<div className="grid grid-cols-4 gap-4">
							{groups[initial].countriesList.map((country) => (
								<CountryLink
									key={country.countryCode}
									name={country.name}
									code={country.countryCode}
								/>
							))}
						</div>
					</div>
				))}
		</div>
	);
}
