export class Configuration {
  constructor(
    public webApiBaseUrl: string,
    public theme: string,
    public fileUploadMaxSize: string | number
  ) {}
}
