import 'reflect-metadata';
import { ApiOptions } from './../types/index';
import { toPascalCase } from './../utils/pascalCase.util';
import { toKebabCase } from './../utils/kebabCase.util';
import { removeFileExt, getPathWithoutFileName, getFileNameFromPath } from './../utils/nameFile.utils';
import { LambdaFunctionType } from '@libs/types';
import { handlerPath } from '@libs/handlerResolver';
import { HTTPMethod } from '@libs/enums/httpMethod.enum';
import { join } from 'path';

export const ApiMetadataSymbol = Symbol.for('microbreaded:api:metadata');

const getCallerStack = (): any[] => {
	const _prepareStackTrace = Error.prepareStackTrace;
	Error.prepareStackTrace = (_, stack) => stack;
	const stacks: any[] = new Error().stack.slice(1) as any;
	Error.prepareStackTrace = _prepareStackTrace;
	return stacks?.filter(s => s?.getFileName());
}

const getCallerFilePath = (handleFileNameWithExt?: string): string => {
	const stacks = getCallerStack();

	try {
		const filePath: string = handleFileNameWithExt
			? stacks.find((f) => f.getFileName().includes(handleFileNameWithExt))?.getFileName()
			: stacks[2].getFileName();
		// stacks.forEach(s => console.log(s.getFileName()))
		return filePath;
	} catch (error) {
		throw new Error(`[MicroBreaded | API] Wrong file path: ${error.message}`);
	}
}

export const Api = (opt: ApiOptions, method?: HTTPMethod, filePath?: string) => (target: Function, propertyKey: string) => {
	if (!filePath)
		throw new Error('[MicroBreaded | API] Wrong file name for lambda. Review handleFileNameWithExt');

	try {
		const acu = Reflect.getMetadata(ApiMetadataSymbol, target);
		const relativePath: string = handlerPath(filePath);
		const pathWithoutFileName: string = getPathWithoutFileName(relativePath);
		const filePathWithoutExt: string = getFileNameFromPath(filePath);
		const fileNameWithoutExt: string = removeFileExt(filePathWithoutExt);
		const funcNameOnKebabCase: string = toKebabCase(propertyKey);
		const httpName: string = toPascalCase(funcNameOnKebabCase);
		const path: string = join(toKebabCase(target.name), opt.path);
		const handler: string = `${pathWithoutFileName}/${fileNameWithoutExt}.${propertyKey}`;
		const lambdaConfig: LambdaFunctionType = {
			handler,
			events: [
				{
					http: {
						method: method,
						path
					}
				}
			],
			...opt.function,

		};
		const httpApis: Record<string, LambdaFunctionType> = {
			...acu,
			[httpName]: lambdaConfig
		};
		Reflect.defineMetadata(ApiMetadataSymbol, httpApis, target);
	} catch (error) {
		console.log(error);
	}
};

export const Post = (opt: ApiOptions) => Api(opt, HTTPMethod.POST, getCallerFilePath(opt.handleFileNameWithExt));
export const Get = (opt: ApiOptions) => Api(opt, HTTPMethod.GET, getCallerFilePath(opt.handleFileNameWithExt));
export const Put = (opt: ApiOptions) => Api(opt, HTTPMethod.PUT, getCallerFilePath(opt.handleFileNameWithExt));
export const Connect = (opt: ApiOptions) => Api(opt, HTTPMethod.CONNECT, getCallerFilePath(opt.handleFileNameWithExt));
export const Delete = (opt: ApiOptions) => Api(opt, HTTPMethod.DELETE, getCallerFilePath(opt.handleFileNameWithExt));
export const Head = (opt: ApiOptions) => Api(opt, HTTPMethod.HEAD, getCallerFilePath(opt.handleFileNameWithExt));
export const Options = (opt: ApiOptions) => Api(opt, HTTPMethod.OPTIONS, getCallerFilePath(opt.handleFileNameWithExt));
export const Path = (opt: ApiOptions) => Api(opt, HTTPMethod.PATCH, getCallerFilePath(opt.handleFileNameWithExt));
export const Trace = (opt: ApiOptions) => Api(opt, HTTPMethod.TRACE, getCallerFilePath(opt.handleFileNameWithExt));
