export function formatNumber(num: string) {
	return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
