import axios from "axios";

const API_BASE_URL = "http://localhost:5500/api/v1";

export interface SubscriptionData {
  name: string;
  price: number;
  startDate: string;
  category: string;
  paymentMethod: string;
}

interface Subscription {
  _id: string;
  name: string;
  price: number;
  startDate: string;
  category: string;
  paymentMethod: string;
  // Add any additional fields you need here
}

interface CreateSubscriptionResponse {
  data: {
    subscription: Subscription;
  };
}

export const createSubscription = async (
  subscription: SubscriptionData,
  token: string | null
): Promise<Subscription> => {
  if (!token) throw new Error("No authentication token found.");

  const res = await axios.post<CreateSubscriptionResponse>(
    `${API_BASE_URL}/subscriptions`,
    subscription,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.data.subscription;
};

export const getSubscriptions = async (token: string | null) => {
  if (!token) throw new Error("No authentication token found.");

  const res = await axios.get(`${API_BASE_URL}/subscriptions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
