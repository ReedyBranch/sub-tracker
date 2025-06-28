import axios from "axios";
import { getToken } from "./auth.api"; // ensure this exists

const API_BASE_URL = "http://localhost:5500/api/v1";

export interface SubscriptionData {
  name: string;
  price: number;
  startDate: string;
  category: string;
  paymentMethod: string;
  frequency: string;
}

interface Subscription {
  _id: string;
  name: string;
  price: number;
  startDate: string;
  category: string;
  paymentMethod: string;
  frequency: string;
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

// ✅ Fixed version that uses token-based auth
export const fetchUserSubscriptions = async () => {
  const token = getToken();
  if (!token) throw new Error("No authentication token found.");

  const res = await axios.get<{ data: Subscription[] }>(`${API_BASE_URL}/subscriptions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data; // assuming { data: Subscription[] }
};