import { getAvaillableCountries } from "./services/countryService";
import CountryLink from "./components/country-link";

export default async function Home() {
	const availableCountries = await getAvaillableCountries();

	return (
		<main className="flex flex-col items-center justify-center w-screen py-8">
			<h1 className="text-4xl mb-5">Country Population App</h1>
			<div className="grid grid-cols-5 gap-x-8 gap-y-5">
				{availableCountries?.map((country) => (
					<CountryLink name={country.name} code={country.countryCode} key={country.countryCode} />
				))}
			</div>
		</main>
	);
}
