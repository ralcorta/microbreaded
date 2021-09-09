import { IExporter } from './../libs/interfaces/exporter.interface';
import { Exposer } from '@libs/exposer';
import ImageController from './image/image.controller';

export class LambdaExporter extends Exposer implements IExporter {
	public modules = [ ImageController ];
}
