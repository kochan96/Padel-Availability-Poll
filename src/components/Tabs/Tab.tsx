import React, { PropsWithChildren } from "react";

type TabProps = {
  title: string;
};

const Tab: React.FC<PropsWithChildren<TabProps>> = ({ children }) => {
  return <div>{children}</div>;
};

export { Tab, type TabProps };
