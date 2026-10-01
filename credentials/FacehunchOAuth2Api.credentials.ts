import type { ICredentialType, INodeProperties } from "n8n-workflow";

export class FacehunchOAuth2Api implements ICredentialType {
  name = "facehunchOAuth2Api";
  displayName = "Facehunch OAuth2 API";
  documentationUrl =
    "https://github.com/facehunch/n8n-nodes-facehunch#authentication";
  icon = { light: "file:facehunch.svg", dark: "file:facehunch.svg" } as const;
  extends = ["oAuth2Api"];
  properties: INodeProperties[] = [
    {
      displayName: "Use Dynamic Client Registration",
      name: "useDynamicClientRegistration",
      type: "hidden",
      default: true,
    },
    {
      displayName: "Server URL",
      name: "serverUrl",
      type: "hidden",
      default: "https://mcp.facehunch.com/v1",
    },
    {
      displayName: "Resource URL",
      name: "resourceUrl",
      type: "hidden",
      default: "https://mcp.facehunch.com/v1",
    },
  ];
}
