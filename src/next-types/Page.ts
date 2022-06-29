import { NextPage } from "next";
import React from "react";
import { LayoutProps } from "./LayoutProps";

export type Page<T = any> = NextPage<T> & {
  layout?: React.FC<LayoutProps>;
  title?: string;
};
