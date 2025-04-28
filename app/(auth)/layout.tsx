import React from "react";

export default function LayoutAuthPage(props: { children: React.ReactNode }) {
  return (
    <main>
      <div className="flex items-center justify-center min-h-screen">
        {props.children}
      </div>
    </main>
  );
}
