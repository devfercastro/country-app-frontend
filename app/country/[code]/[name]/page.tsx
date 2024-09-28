import { getCountryInfo } from "@/app/services/countryService";

import Link from "next/link";
import CountryLink from "@/app/components/country-link";
import Image from "next/image";

import PopulationChart from "@/app/components/population-chart";

import { HomeIcon } from "@heroicons/react/24/solid";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Country Info",
};

export default async function CountryPage({
	params,
}: { params: { code: string; name: string } }) {
	const { code, name } = params;
	const countryInfo = await getCountryInfo(name, code);

	return (
		<main className="flex flex-col w-screen h-screen py-8 px-8">
			<header className="flex flex-row items-center gap-x-8 mb-8">
				<Link
					href="/"
					className="flex items-center gap-x-2 text-2xl"
					aria-label="Home"
				>
					<HomeIcon height={24} width={24} />
				</Link>
				<h1 className="text-4xl font-bold">{countryInfo?.name}</h1>
			</header>
			<div className="flex flex-row justify-between w-full h-full overflow-hidden px-5 bg-gray-800 rounded-xl border-2 border-slate-500 pt-5">
				<div className="flex flex-col">
					<h2 className="text-2xl mb-2 font-semibold">Flag:</h2>
					<Image
						src={countryInfo?.flag ? countryInfo?.flag : "/images/default.png"}
						alt="flag"
						width={200}
						height={200}
						className="rounded-lg"
					/>
					<div className="flex flex-col mt-5">
						<h2 className="text-2xl mb-2 font-semibold">Border countries:</h2>
						<div className="flex flex-col gap-y-2 overflow-y-auto max-h-56">
							{countryInfo?.borders.map((border) => (
								<CountryLink
									name={border.name}
									code={border.iso2}
									key={border.iso2}
								/>
							))}
						</div>
					</div>
				</div>

				<div className="flex flex-col w-min h-full ml-8">
					<h2 className="text-2xl mb-2 font-semibold">Population data:</h2>
					<PopulationChart data={countryInfo.population} />
				</div>
			</div>
		</main>
	);
}
