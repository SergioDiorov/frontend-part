export type ProfileType = {
  location: {
    country: string,
    city: string
  },
  name: string,
  birthDate: string,
  gender: string,
  phone: string,
}

export type ProfileDataResponseType = ProfileType & {
  _id: string,
  user: string,
}

export type ApiResult = {
  code: number;
  message: string;
};

export type ProfileResponseType = ApiResult & {
  profile: ProfileDataResponseType;
};

export type AllProfilesResponseType = ApiResult & {
  profiles: ProfileDataResponseType[];
};

export type SearchListResponseType = ApiResult & {
  searchList: string[];
};

