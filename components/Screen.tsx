import { TopNavigation } from "@ui-kitten/components";
import * as React from "react";
import { ReactNode } from "react";

interface ScreenProps {
  title: string;
  children?: ReactNode;
}

export function Screen({ title, children }: ScreenProps) {
  return (
    <>
      <TopNavigation title={title} alignment="center" />
      {children}
    </>
  );
}
