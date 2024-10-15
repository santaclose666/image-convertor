type methodType = "GET" | "POST";

export interface EndpointType {
  endpoint: string;
  method: methodType;
  headers?: unknown;
}
