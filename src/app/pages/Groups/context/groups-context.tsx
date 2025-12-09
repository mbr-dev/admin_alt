import * as IGC from "./groups-model";
import { createContext } from "react";

export const GroupsContext = createContext({} as IGC.IGroupsContext);

export function GroupsContextProvider({ children }: IGC.IGroupsContextProvider) {
  

  return (
    <GroupsContext.Provider value={{  }}>
      {children}
    </GroupsContext.Provider>
  );
}