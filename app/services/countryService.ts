import axios from "axios";
import axiosRetry from "axios-retry";

import type { APICountriesList, APICountryInfo } from "../common/definitions";

const api = process.env.API_ENDPOINT;

const axiosInstance = axios.create({
	url: api,
	timeout: 10000, // In case Render sleep the API
})

axiosRetry(axiosInstance,
	{
		retries: 3,
		retryDelay: (retryCount) => {
			console.log(`retry attemp: ${retryCount}`);
			return retryCount * 2000; // Wait 2'' before retrying
		}
	}
)

export async function getAvaillableCountries() {
	try {
		const response = await axiosInstance.get<APICountriesList>(`${api}/`);
		return response.data;
	} catch (error) {
		console.error(error);
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
		const response = await axiosInstance.post<APICountryInfo>(`${api}/country`, {
			country: name,
			iso2,
		});
		if (response.status === 200) Object.assign(ouput, response.data);
	} catch (error) {
		console.error(error);
	}

	return ouput;
}
