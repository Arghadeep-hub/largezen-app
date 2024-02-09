export type RootStackParamList = {
  Home: undefined;
  Leads: undefined;
  Meetings: undefined;
  Task: undefined;
  Profile: undefined;
};

export type RootAuthParamList = {
  Login: undefined;
  Signup: undefined;
};

export type UserDataProps = {
  user_id: string;
  user_name: string;
  user_role: number;
  user_phone?: number;
  user_email?: string;
  token: string;
};

export type LocalUserDataProps = {
  user_id: string;
  name: string;
  role: number;
  token: string;
};

export type contact = {
  _id: string;
  name: string;
  phone: string;
  lead_status: number;
  address: string;
  needed: string;
  meeting_status: number;
  meeting_date: string;
};
