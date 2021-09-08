import { HttpStatusCode } from './enums/httpStatusCode.enum';

export const formatJSONResponse = <T = any>(response: T, statusCode: number = HttpStatusCode.OK) => {
	return {
		statusCode,
		body: JSON.stringify(response)
	};
};

export const success = <T = any>(response: T) => {
	return formatJSONResponse<T>(response, HttpStatusCode.OK);
};

export const error = <T = any>(response: T) => {
	return formatJSONResponse<T>(response, HttpStatusCode.BAD_REQUEST);
};

export const unauthorized = <T = any>(response: T) => {
	return formatJSONResponse<T>(response, HttpStatusCode.UNAUTHORIZED);
};
