export type ProfileType = {
  location: {
    country: string,
    city: string
  },
  name: string,
  birthDate: Date,
  gender: string,
  phone: string,
}

export type ProfileDataResponseType = ProfileType & {
  _id: string,
  user: string,
}

export type ProfileResponseType = {
  code: number;
  message: string;
  profile: ProfileDataResponseType;
};

export type AllProfilesResponseType = {
  code: number;
  message: string;
  profiles: ProfileDataResponseType[];
};

