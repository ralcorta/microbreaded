import { middyfy } from '@libs/lambda';

export const MiddlewareMetadataSymbol = Symbol.for('microbreaded:middleware:metadata');
export const Use = (middlewares: any | any[]) => (target: any, key: string) => {
	const methodNames: Record<string, boolean> = Reflect.getMetadata(MiddlewareMetadataSymbol, target) ?? {};

	let method = target[key];
	try {
		if (!methodNames[key]) method = middyfy(method);
		method.use(middlewares);
	} catch (error) {
		console.log(error);
		throw error;
	}

	Reflect.metadata(MiddlewareMetadataSymbol, {
		...methodNames,
		[target.name]: true
	})(target);
};
