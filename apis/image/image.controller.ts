import { success } from '@libs/apiGateway';
import { Get, Post } from '@libs/decorators/api';
import { Controller } from '@libs/decorators/controller';
import { ValidatedAPIGatewayProxyEventClassValidator } from '@libs/types';
import 'source-map-support/register';

@Controller()
class ImageController {
	@Post({ path: 'upload' })
	static upload = async ({ body }: ValidatedAPIGatewayProxyEventClassValidator) => {
		return success({
			message: `upload ${body.name}, welcome to the exciting Serverless world!`
		});
	};

	@Post({ path: 'event' })
	static getEvent = async (event) => {
		return success(event);
	};

	@Get({ path: 'get' })
	static get = async () => {
		return success({
			message: 'adfasf'
		});
	};
}

export = ImageController;
