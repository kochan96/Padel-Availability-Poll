type CourtAvailabilitySlot = {
  readonly start_time: string;
  readonly duration: number;
  readonly price: string;
};

type CourtAvailabilityResponse = {
  readonly resource_id: string;
  readonly start_date: string;
  readonly slots: CourtAvailabilitySlot[];
};

type CourtProperties = {
  readonly resource_type: string;
  readonly resource_size: string;
  readonly resource_feature: string;
};

type CourtResources = {
  readonly resource_id: string;
  readonly name: string;
  readonly description: string;
  readonly is_active: boolean;
  readonly properties: CourtProperties;
};

type TenantsResponse = {
  readonly tenant_id: string;
  readonly tenant_name: string;
  readonly resources: CourtResources[];
};

const playtomicHost = "https://playtomic.io/api/v1";
const userId = "me";
const tenant_id = "057c5f40-f54b-4e4d-977c-1f9547a25076";

const fetchTenantsInfo = async (): Promise<TenantsResponse> => {
  const endpoint = encodeURI(
    `tenants?user_id=${userId}&tenant_id=${tenant_id}&sport_id=PADEL`
  );
  const response = await fetch(`${playtomicHost}/${endpoint}`);
  const responseBody = await response.json();
  const tenantsResponse = responseBody as TenantsResponse[];
  return tenantsResponse[0];
};

const fetchAvailability = async (
  year: number,
  month: number,
  day: number
): Promise<CourtAvailabilityResponse[]> => {
  const monthText = month.toString().padStart(2, "0");
  const dayText = day.toString().padStart(2, "0");

  const local_start_min = `${year}-${monthText}-${dayText}T00:00:00`;
  const local_start_max = `${year}-${monthText}-${dayText}T23:59:59`;
  const endpoint = encodeURI(
    `availability?user_id=${userId}&tenant_id=${tenant_id}&sport_id=Padel&local_start_min=${local_start_min}&local_start_max=${local_start_max}`
  );
  const response = await fetch(`${playtomicHost}/${endpoint}`);
  const responseBody = await response.json();
  return responseBody as CourtAvailabilityResponse[];
};

export {
  fetchAvailability,
  fetchTenantsInfo,
  type TenantsResponse,
  type CourtAvailabilityResponse,
};
