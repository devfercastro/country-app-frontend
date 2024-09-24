import type { APICountriesList } from "../common/definitions";
import CountryLink from "./country-link";

const groupCountriesByInitial = (countries: APICountriesList) => {
	return countries.reduce(
		(acc, country) => {
			const initial = country.name.charAt(0).toUpperCase();
			if (!acc[initial]) {
				acc[initial] = [];
			}
			acc[initial].push(country);
			return acc;
		},
		{} as Record<string, APICountriesList>,
	);
};

export default function CountryList({
	countries,
}: { countries: APICountriesList | undefined }) {
	const groupedCountries = groupCountriesByInitial(countries || []);

	return (
		<div className="flex flex-col gap-y-12">
			{groupedCountries &&
				Object.keys(groupedCountries).map((initial) => (
					<div
						className="flex flex-col"
						id={`group${initial}`}
						key={`group${initial}`}
					>
						<p className="pl-12 font-bold mb-4 border-b-2">
							{initial.toUpperCase()}
						</p>
						<div className="grid grid-cols-4 gap-4">
							{groupedCountries[initial].map((country) => (
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
