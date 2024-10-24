import { THTTPResponseData } from "@/types/util";
import apiService from "./apiService";

type TCheckPromocode = THTTPResponseData<ICheckPromocodeReturn>;
export interface ICheckPromocodeReturn {
  promocode: string;
  valid: boolean;
  discount: number;
}

type THTTPReferalStatusReturn = THTTPResponseData<IHTTPReferralStats>;
export interface IHTTPReferralStats {
  promocode: string;
  activations: number;
  revenue: number;
  referralActivationAmount: number;
}

type THTTPGetPresetPromocode = THTTPResponseData<IHTTPGetPresetPromocodeReturn>;
export interface IHTTPGetPresetPromocodeReturn {
  presetPromocode: string | null;
}

class ReferralService {
  private routeBase = "/referral";

  public async getReferralStats(userId: number): Promise<IHTTPReferralStats> {
    return apiService
      .get<THTTPReferalStatusReturn>(`${this.routeBase}/stats/${userId}`)
      .then((res) => res.data.data);
  }

  public async checkPromocode(
    promocode: string
  ): Promise<ICheckPromocodeReturn> {
    return apiService
      .get<TCheckPromocode>(`${this.routeBase}/check-promocode/${promocode}`)
      .then((res) => res.data.data);
  }

  public async getPresetPromocode(
    userId: number
  ): Promise<IHTTPGetPresetPromocodeReturn> {
    return apiService
      .get<THTTPGetPresetPromocode>(
        `${this.routeBase}/preset-promocode/${userId}`
      )
      .then((res) => res.data.data);
  }
}

const referralService = new ReferralService();
export default referralService;
