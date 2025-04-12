import Navigation from "@/components/navigation";
import React from "react";

export default function LayoutMainPage(props: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Navigation />
      {props.children}
    </React.Fragment>
  );
}
