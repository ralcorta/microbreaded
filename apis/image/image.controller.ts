import { success } from '@libs/apiGateway';
import { Get, Post } from '@libs/decorators/api';
import { Controller } from '@libs/decorators/controller';
import { Use } from '@libs/decorators/middleware';
import { ValidatedAPIGatewayProxyEventClassValidator } from '@libs/types';
import errorLogger from '@middy/error-logger';
import 'source-map-support/register';

@Controller()
class ImageController {
	@Post({ path: 'upload' })
	@Use(errorLogger())
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
