"use client";

import { useEffect, useState, useMemo } from "react";
import type { APICountriesList } from "../common/definitions";
import CountryLink from "./country-link";

type CountryGroups = {
	[key: string]: { groupId: string; countriesList: APICountriesList };
};

const searchCountries = (query: string, countries: APICountriesList) => {
	return countries.filter((country) =>
		country.name.toLowerCase().startsWith(query.toLowerCase()),
	);
};

const flattenCountriesList = (countries: CountryGroups) => {
	return Object.keys(countries).reduce((acc, key) => {
		acc.push(...countries[key].countriesList);
		return acc;
	}, [] as APICountriesList);
};

export default function CountryList({
	groups,
	query,
}: {
	groups: CountryGroups;
	query?: string;
}) {
	// Use useMemo to avoid recalculating flattenCountries on every render
	const flattenCountries = useMemo(
		() => flattenCountriesList(groups),
		[groups],
	);

	const [searchedCountries, setSearchedCountries] =
		useState<APICountriesList>(flattenCountries);

	useEffect(() => {
		if (query) {
			setSearchedCountries(searchCountries(query, flattenCountries));
		} else {
			setSearchedCountries(flattenCountries); // Reset to full list when query is empty
		}
	}, [query, flattenCountries]);

	return (
		<div className="flex flex-col gap-y-12 w-full">
			{groups &&
				query === "" &&
				Object.keys(groups).map((initial) => (
					<div
						className="flex flex-col"
						id={`group${initial}`}
						key={`group${initial}`}
					>
						<p className="pl-12 font-bold mb-4 border-b-2">
							{initial.toUpperCase()}
						</p>
						<div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
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
			{query !== "" && (
				<div className="grid grid-cols-2 gap-2 pt-4 md:grid-cols-4 md:gap-4">
					{searchedCountries.map((country) => (
						<CountryLink
							key={country.countryCode}
							name={country.name}
							code={country.countryCode}
						/>
					))}
				</div>
			)}
		</div>
	);
}
