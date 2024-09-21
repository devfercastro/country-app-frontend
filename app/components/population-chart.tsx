import type { populationItem } from "../common/definitions";
import { formatNumber } from "../common/utils";

export default function PopulationChart({ data }: { data: populationItem[] }) {
	const max = Math.max(...data.map((item) => item.value));
	const min = Math.min(...data.map((item) => item.value));

	return (
		<div className="flex flex-col w-min h-min">
			<div className="flex flex-row w-min h-min border-l-2 border-b-2 p-2">
				{data?.reverse().map((item) => (
					<div
						key={item.year}
						id={`${item.year}`}
						className="relative h-[350px] w-4 group"
					>
						<p
							className="font-extrabold absolute left-0"
							style={{ bottom: `${((item.value - min) / (max - min)) * 90}%` }}
						>
							.
						</p>
						<div className="absolute left-8 bottom-0 hidden group-hover:flex flex-col bg-white p-2 text-xs text-black rounded-lg shadow-lg">
							<span>Year: {item.year}</span>
							<span>Population: {formatNumber(String(item.value))}</span>
						</div>
					</div>
				))}
			</div>
			<div className="flex flex-row justify-between w-full">
				<p>{data[0].year}</p>
				<p>{data.slice(-1)[0].year}</p>
			</div>
		</div>
	);
}
