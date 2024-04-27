interface IUpdateAppVersionDTO {
  availableOniOS: boolean;
  availableOnAndroid: boolean;
}

interface ICreateAppVersionDTO {
  id?: string;
  appVersion: string;
  availableOniOS: boolean;
  availableOnAndroid: boolean;
}

export { ICreateAppVersionDTO, IUpdateAppVersionDTO };
