import { getAvaillableCountries } from "./services/countryService";
import CountryList from "./components/country-list";
import type { APICountriesList } from "./common/definitions";
import Navbar from "./components/navbar";
import Search from "./components/search";

const groupCountriesByInitial = (countries: APICountriesList) => {
	return countries.reduce(
		(acc, country) => {
			const initial = country.name.charAt(0).toUpperCase();
			if (!acc[initial]) {
				acc[initial] = {
					groupId: `group${initial}`,
					countriesList: [],
				};
			}
			acc[initial].countriesList.push(country);
			return acc;
		},
		{} as Record<
			string,
			{
				groupId: string;
				countriesList: APICountriesList;
			}
		>,
	);
};

export default async function Home({
	searchParams,
}: {
	searchParams?: {
		query?: string;
	};
}) {
	const query = searchParams?.query || "";
	const availableCountries = await getAvaillableCountries();
	const groupedCountries = groupCountriesByInitial(availableCountries || []);

	return (
		<main className="flex flex-col items-center justify-center w-screen pb-12">
			<header className="flex flex-col items-center justify-center w-full py-4 pt-8 pr-10 bg-black">
				<h1 className="text-xl font-bold mb-5 md:text-2xl">Country Population App</h1>
				<Navbar groups={groupedCountries} />
				<Search placeholder="Search country..." />
			</header>
			<div className="flex flex-row w-full px-2 pr-12 md:px-20 md:pr-26 md:mt-4">
				<CountryList groups={groupedCountries} query={query} />
			</div>
		</main>
	);
}
