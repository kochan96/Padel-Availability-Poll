import React from "react";
import styled from "styled-components";

const selectedColor = "rgb(30,190,230)";
const defaultColor = "transparent";

const TabTitleDiv = styled.div<{ selected: boolean }>`
  background-color: white;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
  border-bottom: 4px solid
    ${(props) => (props.selected ? selectedColor : defaultColor)};
`;

type TabTitleProps = {
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
  selected: boolean;
};

const TabTitle: React.FC<TabTitleProps> = ({
  title,
  setSelectedTab,
  index,
  selected,
}) => {
  return (
    <TabTitleDiv selected={selected} onClick={() => setSelectedTab(index)}>
      {title}
    </TabTitleDiv>
  );
};

export { TabTitle };
