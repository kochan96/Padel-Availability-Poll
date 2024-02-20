import React, { ReactElement, useState } from "react";
import { TabTitle } from "./TabTitle";
import styled from "styled-components";
import { TabProps } from "./Tab";

const TabTitleContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: stretch;
  padding: 16px;
`;

type TabsProps = {
  children: ReactElement<TabProps>[];
};

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <TabTitleContainer>
        {children.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            selected={selectedTab === index}
            index={index}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </TabTitleContainer>
      <div>{children[selectedTab]}</div>
    </div>
  );
};

export { Tabs };
