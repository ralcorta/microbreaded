import { ApiMetadataSymbol } from './api';
import { Singleton } from '../singleton';
import 'reflect-metadata';
import { toKebabCase } from '../utils/kebabCase.util';

export const ControllerMetadataSymbol = Symbol.for('microbreaded:controller:metadata');

/**
 * readonly name: string;  // name of the endpoint
 * readonly basePath?: string;  // base path that will be prepended to the path defined in each Lambda.
 * readonly private?: boolean;  // Default: false. Setting this field is equivalent to add its value to every @Lambda. If any @Controller as private set then that will have precedence
 * readonly cors?: boolean;  // Default: false. Same as private.
 */
export interface IControllerOptions {
	name?: string;
	basePath?: string;
	private?: boolean;
	cors?: boolean;
}

export function Controller(opt?: IControllerOptions): ClassDecorator {
	const single = Singleton.getInstance();
	return <TFunction extends Function>(target: TFunction) => {
		const options: IControllerOptions = opt || {};
		options.name = options.name || toKebabCase(target.name);
		if (!options.basePath) options.basePath = options.name;
		const apiMetadata = Reflect.getMetadata(ApiMetadataSymbol, target);
		single.push(target.name, apiMetadata);
	};
}
