import { success } from '@libs/apiGateway';
import { Get, Post } from '@libs/decorators/api';
import { Lambda } from '@libs/decorators/lambda';
import { ValidatedAPIGatewayProxyEventClassValidator } from '@libs/types';
import 'source-map-support/register';

@Lambda()
class ImageModule {
	@Post({ path: 'upload' })
	static upload = async ({ body }: ValidatedAPIGatewayProxyEventClassValidator) => {
		return success({
			message: `upload ${body.name}, welcome to the exciting Serverless world!`
		});
	};

	@Get({ path: 'get' })
	static get = async () => {
		return success({
			message: 'adfasf'
		});
	};
}

export = ImageModule;
