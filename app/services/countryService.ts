import axios from "axios";
import type { APICountriesList, APICountryInfo } from "../common/definitions";

const api = process.env.API_ENDPOINT;

export async function getAvaillableCountries() {
	try {
		const response = await axios.get<APICountriesList>(`${api}/`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
}

export async function getCountryInfo(name: string, iso2: string) {
	const ouput: APICountryInfo = {
		name: "",
		borders: [],
		population: [],
		flag: "",
	};
	try {
		const response = await axios.post<APICountryInfo>(`${api}/country`, {
			country: name,
			iso2,
		});
		if(response.status === 200) Object.assign(ouput, response.data);
	} catch (error) {
		console.log(error);
	}

	return ouput;
}
