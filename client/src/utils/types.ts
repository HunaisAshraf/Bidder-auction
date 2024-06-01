export type ReactSetState = React.Dispatch<React.SetStateAction<string>>;

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;

};

export type AuthData = {
  user?: User | null;
//   admin?: User | null;
};
