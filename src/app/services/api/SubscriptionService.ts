import apiService from "./apiService";

export type TPaymentType = "quarter" | "lifetime";
export type TSubscriptionType = "exclusive" | "platinum" | "regular";
export interface IHTTPSubscription {
  readonly id: number;
  readonly name: string;
  readonly price: number;
  readonly discount: number;
  readonly blockchains: number;
  readonly paymentType: TPaymentType;
  readonly properties: string[];
  readonly subscriptionType: TSubscriptionType;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

interface Subscription {
  readonly id: number;
  readonly name: string;
  readonly price: string;
  readonly discount: number;
  readonly blockchains: number;
  readonly paymentType: "quarter" | "lifetime";
  readonly properties: string[];
  readonly subscriptionType: "exclusive" | "platinum" | "regular";
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface UserSubscriptionWithDetails {
  readonly id: number;
  readonly userId: number;
  readonly subscriptionId: number;
  readonly blockchains: string[];
  readonly expiresAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly subscription: Subscription;
}

export type TBlockchainsLowercase =
  | "btc"
  | "eth"
  | "usdt"
  | "ltc"
  | "sol"
  | "bnb";

export interface IPurchaseSubscription {
  userId: number;
  subscriptionId: number;
  blockchains: TBlockchainsLowercase[];
  promocode: string;
}

export interface IPurhcaseSubscriptionReturn {
  link: string;
}

class SubscriptionService {
  public async getSubscriptions(): Promise<IHTTPSubscription[]> {
    return apiService
      .get<IHTTPSubscription[]>(`/subscriptions`)
      .then((res) => res.data);
  }
  public async purchaseSubscription(
    data: IPurchaseSubscription
  ): Promise<IPurhcaseSubscriptionReturn> {
    return apiService
      .post<IPurhcaseSubscriptionReturn>(`/subscriptions/purchase`, data)
      .then((res) => res.data);
  }
  public async getUserSubscriptions(
    userId: number
  ): Promise<UserSubscriptionWithDetails[]> {
    return apiService
      .get<UserSubscriptionWithDetails[]>(`/subscriptions/${userId}`)
      .then((res) => res.data);
  }
}

const subscriptionService = new SubscriptionService();
export default subscriptionService;
