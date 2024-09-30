import Link from "next/link";

export default function CountryLink({
	name,
	code,
}: { name: string; code: string }) {
	return (
		<Link
			href={`/country/${code}/${name}`}
			className="bg-slate-900 rounded-lg px-2 py-4 text-center font-semibold leading-none hover:bg-slate-50 hover:text-black md:px-4"
		>
			{name}
		</Link>
	);
}
