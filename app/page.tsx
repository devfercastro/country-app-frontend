import { getAvaillableCountries } from "./services/countryService";
import CountryList from "./components/country-list";
import type { APICountriesList } from "./common/definitions";
import Navbar from "./components/navbar";

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

export default async function Home() {
	const availableCountries = await getAvaillableCountries();
	const groupedCountries = groupCountriesByInitial(availableCountries || []);

	return (
		<main className="flex flex-col items-center justify-center w-screen pt-[180px] pb-12">
			<header className="flex flex-col items-center justify-center w-full py-4 fixed top-0 left-0 bg-black">
				<h1 className="text-4xl font-bold mb-5">Country Population App</h1>
				<Navbar groups={groupedCountries} />
			</header>
			<div className="flex flex-row px-14">
				<CountryList groups={groupedCountries} />
			</div>
		</main>
	);
}
