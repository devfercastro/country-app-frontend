"use client";

import { useState } from "react";
import type { populationItem } from "../common/definitions";
import { formatNumber } from "../common/utils";

type MousePosition = {
	x: number;
	y: number;
};

export default function PopulationChart({ data }: { data: populationItem[] }) {
	const max = Math.max(...data.map((item) => item.value));
	const min = Math.min(...data.map((item) => item.value));

	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: 0,
		y: 0,
	});
	const [isHovered, setIsHovered] = useState<boolean>(false);

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	const handleMouseMove = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => {
		// Get chart position relative to viewport
		const chartRect = event.currentTarget.getBoundingClientRect();
		const { clientX, clientY } = event;

		// Calculate mouse position relative to the chart
		setMousePosition({
			x: clientX - chartRect.left,
			y: clientY - chartRect.top,
		});
	};

	return (
		<div className="flex flex-col w-full h-min">
			<div className="flex flex-row w-full h-min border-l-2 border-b-2 pr-2 relative">
				{[...data].reverse().map((item) => (
					<div
						key={item.year}
						id={`${item.year}`}
						className="relative h-[350px] w-full group"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						onMouseMove={handleMouseMove}
					>
						{isHovered && (
							<div
								className="absolute left-8 bottom-0 hidden group-hover:flex flex-col bg-white p-2 text-xs text-black rounded-lg shadow-lg h-min z-50"
								style={{
									left: mousePosition.x + 15, // Offset to the right of the mouse
									top: mousePosition.y + 20, // Offset bellow the mouse
								}}
							>
								<span>Year: {item.year}</span>
								<span>Population: {formatNumber(String(item.value))}</span>
							</div>
						)}

						<p
							className="font-extrabold text-xl absolute left-0 cursor-default text-center select-none"
							style={{ bottom: `${((item.value - min) / (max - min)) * 95}%` }}
						>
							.
						</p>
					</div>
				))}
			</div>
			<div className="flex flex-row justify-between w-full">
				<p>{data.slice(-1)[0].year}</p>
				<p>{data[0].year}</p>
			</div>
		</div>
	);
}
