import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import { HomeIcon } from "@heroicons/react/24/solid";

import { getCountryInfo } from "@/app/services/countryService";
import CountryLink from "@/app/components/country-link";
import PopulationChart from "@/app/components/population-chart";

export const metadata: Metadata = {
	title: "Country Info",
};

// TODO: Pass tailwind classes as props
const CountryFlag = ({
	url,
	width,
	height,
	classes,
}: { url: string; width: number; height?: number; classes?: string }) => {
	return (
		<Image
			src={url}
			alt="flag"
			width={width}
			height={height ? height : width - width * 0.3}
			className={`rounded-sm ${classes}`}
		/>
	);
};

export default async function CountryPage({
	params,
}: { params: { code: string; name: string } }) {
	const { code, name } = params;
	const countryInfo = await getCountryInfo(name, code);

	return (
		<main className="flex flex-col w-screen h-screen py-8 px-8 md:h-min">
			<header className="flex flex-row items-center gap-x-8 mb-8">
				<Link
					href="/"
					className="flex items-center gap-x-2 text-2xl"
					aria-label="Home"
				>
					<HomeIcon height={24} width={24} />
				</Link>
				<h1 className="font-bold text-2xl md:text-4xl">{countryInfo?.name}</h1>
				<CountryFlag url={countryInfo?.flag} width={50} />
			</header>
			<div className="w-full flex flex-col justify-center items-center px-5 pt-5 md:flex-row">
				<div className="w-full flex flex-col">
					<h2 className="text-2xl mb-2 font-semibold">Population data:</h2>
					<PopulationChart data={countryInfo.population} />

					<h2 className="text-2xl mb-2 font-semibold">Border countries:</h2>
					<div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
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
		</main>
	);
}
