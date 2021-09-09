export const MiddlewareMetadataSymbol = Symbol.for('microbreaded:middleware:metadata');
export const TestMethodDecorator = () => (target: Function, propertyKey: string, descriptor: PropertyDescriptor) => {
	try {
		const originalMethod = descriptor.value;

		descriptor.value = function(...args: any[]) {
			const result = originalMethod.apply(this, args);
			return result;
		};

		return descriptor;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
