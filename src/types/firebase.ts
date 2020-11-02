export type typeForUserData = {
  productData?: boolean;
  isEmpty: boolean;
  isLoaded: boolean;
};

export type AuthStatus = {
  isLoaded: boolean;
  isEmpty: boolean;
  displayName: string;
  uid: string;
};

export type AppAuth = {
  auth: AuthStatus;
  profile?: typeForUserData;
};
