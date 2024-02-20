import styled, { createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";
import { Tabs, Tab } from "./components/Tabs";
import {
  fetchTenantsInfo,
  fetchAvailability,
  TenantsResponse,
  CourtAvailabilityResponse,
} from "./api/platomicApi";
import CourtAvailabilityMatrix from "./components/CourtAvailabilityMatrix/CourtAvailabilityMatrix";
import { addDays } from "date-fns";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
  }

  * {
    box-sizing: border-box;
    margin: 0;
  }
`;

const MainDiv = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScheduleSelectorCard = styled.div`
  border-radius: 25px;
  box-shadow: 10px 2px 30px rgba(0, 0, 0, 0.15);
  padding: 20px;
  width: 90%;
  max-width: 800px;
  & > * {
    flex-grow: 1;
  }
`;

const App = () => {
  const [placeInfo, setPlaceInfo] = useState<TenantsResponse | null>(null);
  const [courtInfo, setCourtInfo] = useState<
    CourtAvailabilityResponse[] | null
  >(null);

  const [lasUpdatedInfo, setLastUpdated] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());

  useEffect(() => {
    const getPlaceInfo = async () => {
      const response = await fetchTenantsInfo();
      setPlaceInfo(response);
    };
    getPlaceInfo();
  }, []);

  useEffect(() => {
    const getCourtInfo = async () => {
      const promises: Promise<CourtAvailabilityResponse[]>[] = [];
      for (let counter = 0; counter < 7; counter += 1) {
        const currentDate = addDays(new Date(), counter);

        promises.push(
          fetchAvailability(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            currentDate.getDate()
          )
        );
      }
      const result = await Promise.all(promises);
      setCourtInfo((prev) => result.flat(1));
      setLastUpdated(new Date());
    };

    getCourtInfo();
    const myInterval = setInterval(getCourtInfo, 30000); //update every 30 seconds

    return () => {
      clearInterval(myInterval);
    };
  }, []);

  return (
    <MainDiv>
      <GlobalStyle />
      <div>
        <a href="https://playtomic.io/interpadel-warszawa/057c5f40-f54b-4e4d-977c-1f9547a25076?q=PADEL">
          Playtomic
        </a>
      </div>
      <ScheduleSelectorCard>
        <Tabs>
          <Tab title="Dostępność kortów">
            <CourtAvailabilityMatrix
              placeInfo={placeInfo}
              courtInfo={courtInfo}
              lastUpdated={lasUpdatedInfo}
              startDate={startDate}
              setStartDate={setStartDate}
            />
          </Tab>
          <Tab title="Dostępność ludzi"></Tab>
        </Tabs>
      </ScheduleSelectorCard>
    </MainDiv>
  );
};

export default App;
