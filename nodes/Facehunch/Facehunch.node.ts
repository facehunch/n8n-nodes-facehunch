import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  INodeProperties,
} from "n8n-workflow";
import { NodeConnectionTypes } from "n8n-workflow";
import { executeOperations, type Operation } from "./transport";
import operations from "./operations.json";
import properties from "./properties.json";

export class Facehunch implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Facehunch",
    name: "facehunch",
    icon: { light: "file:facehunch.svg", dark: "file:facehunch.svg" },
    group: ["transform"],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: "Automate your Facehunch account",
    defaults: { name: "Facehunch" },
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    usableAsTool: true,
    credentials: [{ name: "facehunchOAuth2Api", required: true }],
    properties: properties as INodeProperties[],
  };
  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    return executeOperations(
      this,
      "https://mcp.facehunch.com/mcp",
      "facehunchOAuth2Api",
      operations as unknown as Operation[],
    );
  }
}
