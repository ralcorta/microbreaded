import { Handler } from 'aws-lambda';
import { APIGatewayProxyResult } from 'aws-lambda';
import { AWS } from '@serverless/typescript';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { FromSchema } from 'json-schema-to-ts';

export type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> };
export type ValidatedAPIGatewayProxyEventClassValidator<S extends Record<string, any> = Record<string, any>> = Omit<
	APIGatewayProxyEvent,
	'body'
> & {
	body: S;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>;
export type LambdaFunctionType = AWS['functions'][0] & { event?: AWS['functions'][0]['events'][0] };
export type LambdaFunctionEventType = AWS['functions'][0]['events'];
export type ApiOptions = { path: string; handleFileNameWithExt?: string; function?: LambdaFunctionType };
