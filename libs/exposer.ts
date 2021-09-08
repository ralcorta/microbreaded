import { Singleton } from './singleton';
import { LambdaFunctionType } from './types';

export abstract class Exposer {
	public static getServerlessFunctions() {
		const modules: Record<string, Record<string, LambdaFunctionType>> = Singleton.getInstance().modules;
		const lambdas: Record<string, LambdaFunctionType> = {};
		for (const moduleName in modules) {
			if (Object.prototype.hasOwnProperty.call(modules, moduleName)) {
				const lambdasConfig = modules[moduleName];
				for (const lambdaName in lambdasConfig) {
					if (Object.prototype.hasOwnProperty.call(lambdasConfig, lambdaName)) {
						const lambdaConfig = lambdasConfig[lambdaName];
						const finalName = `${moduleName}${lambdaName}`;
						lambdas[finalName] = lambdaConfig;
					}
				}
			}
		}
		return lambdas;
	}
}
