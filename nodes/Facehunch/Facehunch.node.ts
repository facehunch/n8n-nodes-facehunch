import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';
import { executeOperations, type Operation, type ResourceRoute } from './transport';
import operations from './operations.json';
import routes from './routes.json';

export class Facehunch implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Facehunch',
		name: 'facehunch',
		icon: {
			light: 'file:facehunch.svg',
			dark: 'file:facehunch.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Automate your Facehunch account',
		defaults: {
			name: 'Facehunch',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'facehunchOAuth2Api',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Report',
						value: 'reports',
					},
				],
				default: 'account',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Profile',
						value: 'get_profile',
						description:
							"Read the signed-in customer's own Facehunch account profile. Does not search for or identify other people.",
						action: 'Get profile in facehunch',
					},
				],
				default: 'get_profile',
				displayOptions: {
					show: {
						resource: ['account'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Report',
						value: 'get_report',
						description:
							'Read metadata and stored source links from an owned unlocked report. Similarity is not proof of identity. Locked results remain hidden; finish access in the product UI',
						action: 'Get report in facehunch',
					},
					{
						name: 'List Reports',
						value: 'list_reports',
						description:
							'Browse existing owned reports. No search or identity inference is performed.',
						action: 'List reports in facehunch',
					},
				],
				default: 'get_report',
				displayOptions: {
					show: {
						resource: ['reports'],
					},
				},
			},
			{
				displayName: 'Report ID',
				name: 'get_report__reportId',
				type: 'string',
				default: '',
				required: true,
				description: 'The report ID for this operation',
				displayOptions: {
					show: {
						operation: ['get_report'],
						resource: ['reports'],
					},
				},
			},
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				default: false,
				description: 'Whether to return all results or only up to a given limit',
				displayOptions: {
					show: {
						operation: ['list_reports'],
						resource: ['reports'],
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				typeOptions: {
					minValue: 1,
					numberPrecision: 0,
				},
				description: 'Max number of results to return',
				displayOptions: {
					show: {
						operation: ['list_reports'],
						resource: ['reports'],
						returnAll: [false],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return executeOperations(
			this,
			'https://facehunch.com',
			'facehunchOAuth2Api',
			operations as unknown as Operation[],
			routes as Record<string, ResourceRoute>,
		);
	}
}
