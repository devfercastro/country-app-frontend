import { getAvaillableCountries } from "./services/countryService";
import Link from "next/link";

export default async function Home() {
	const availableCountries = await getAvaillableCountries();
	console.log(availableCountries);
	return (
		<main className="flex flex-col items-center justify-center w-screen py-8">
			<h1 className="text-4xl mb-5">Country Population App</h1>
			<div className="grid grid-cols-5 gap-x-8 gap-y-5">
				{availableCountries?.map((country) => (
					<Link
						href={`/country/${country.countryCode}${country.name}`}
						key={country.countryCode}
						className="bg-slate-900 rounded-lg p-4 text-center hover:bg-slate-50 hover:text-black"
					>
						{country.name}
					</Link>
				))}
			</div>
		</main>
	);
}
