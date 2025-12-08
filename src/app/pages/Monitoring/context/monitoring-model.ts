
import React from "react";

export interface IMonitoringContextProvider {
  children: React.ReactNode;
}

export interface IMonitoringContext {
  data: any | null;
}