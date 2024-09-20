import { getCountryInfo } from "@/app/services/countryService";
import Link from "next/link";
import Image from "next/image";

export default async function CountryPage({
	params,
}: { params: { id: string } }) {
	const code = params.id.slice(0, 2);
	const name = params.id.slice(2);
	const countryInfo = await getCountryInfo(name, code);

	console.log(countryInfo);
	return (
		<main className="flex flex-col items-center justify-center w-screen py-8">
			<h1 className="text-4xl mb-5">{countryInfo?.name}</h1>
			<div className="grid grid-cols-3">
				<Image
					src={countryInfo?.flag ? countryInfo?.flag : "/images/default.png"}
					alt="flag"
					width={200}
					height={200}
				/>
				<div className="flex flex-col">
					{countryInfo?.borders.map((border) => (
						<Link
							href={`/country/${border.iso2}${border.name}`}
							key={border.iso2}
							className="bg-slate-900 rounded-lg p-4 text-center hover:bg-slate-50 hover:text-black"
						>
							{border.name}
						</Link>
					))}
				</div>
				<div className="flex flex-col">
					{countryInfo?.population.map((popItem) => (
						<div key={popItem.year} className="flex flex-row gap-x-4">
							<p>{popItem.year}</p>
							<p>{popItem.value}</p>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
