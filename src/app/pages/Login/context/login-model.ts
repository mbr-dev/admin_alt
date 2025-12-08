
import React, { Dispatch, SetStateAction } from "react";

export interface ILoginContextProvider {
  children: React.ReactNode;
}

export interface ILoginContext {
  load: boolean;
  handleSignIn: (user: string, password: string) => Promise<void>;
}