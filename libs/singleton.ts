type SModule = Record<string, any>;

export class Singleton {
	private static instance: Singleton;
	private _modules: SModule = {};

	private constructor() {}

	public get modules(): SModule {
		return this._modules;
	}

	public static getInstance(): Singleton {
		if (!Singleton.instance) {
			Singleton.instance = new Singleton();
		}
		return Singleton.instance;
	}

	public push(key: string, data: any): void {
		this._modules[key] = data;
	}
}
