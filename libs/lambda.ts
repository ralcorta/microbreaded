import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';

export const middyfy = (handler, ...middlewares: any[]) => {
	let middyHandler = middy(handler).use(middyJsonBodyParser());
	for (const m of middlewares) {
		middyHandler = middyHandler.use(m);
	}
	return middyHandler;
};
