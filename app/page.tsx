import { getAvaillableCountries } from "./services/countryService";
import CountryList from "./components/country-list";

export default async function Home() {
	const availableCountries = await getAvaillableCountries();

	return (
		<main className="flex flex-col items-center justify-center w-screen py-8">
			<h1 className="text-4xl font-bold mb-5">Country Population App</h1>
			<div className="flex flex-row px-14">
				<CountryList countries={availableCountries} />
			</div>
		</main>
	);
}
