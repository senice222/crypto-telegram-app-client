import { ISettings } from "@/store/slices/settingsSlice";
import apiService from "./apiService";
import { THTTPResponseData } from "@/types/util";

type TGetSettingsResponse = THTTPResponseData<ISettings>;

class SettingsService {
  public async getSettings(): Promise<ISettings> {
    return apiService
      .get<TGetSettingsResponse>(`/settings`)
      .then((res) => res.data.data);
  }
}

const settingsService = new SettingsService();
export default settingsService;
