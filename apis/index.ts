import { IExporter } from './../libs/interfaces/exporter.interface';
import { Exposer } from '@libs/exposer';
import ImageModule from './image/lambdas';

export class LambdaExporter extends Exposer implements IExporter {
	public modules = [ ImageModule ];
}
