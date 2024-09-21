import Link from "next/link";

export default function CountryLink({
	name,
  code
}: { name:string, code: string }) {
	return (
		<Link
			href={`/country/${code}${name}`}
			className="bg-slate-900 rounded-lg p-4 text-center hover:bg-slate-50 hover:text-black"
		>
			{name}
		</Link>
	);
}
