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
  data: Subscription;
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

  return res.data.data;
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

export const fetchUserSubscriptions = async () => {
  const token = getToken();
  if (!token) throw new Error("No authentication token found.");

  const res = await axios.get<{ data: Subscription[] }>(`${API_BASE_URL}/subscriptions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

export const deleteSubscription = async (id: string, token: string | null) => {
  if (!token) throw new Error("No auth token");

  const res = await axios.delete(`${API_BASE_URL}/subscriptions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateSubscription = async (
  id: string,
  updates: Partial<SubscriptionData>,
  token: string
): Promise<Subscription> => {
  const response = await axios.put<{ data: Subscription }>(
    `${API_BASE_URL}/subscriptions/${id}`,
    updates,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("🔍 Full Update API Response:", response);
  console.log("response.data:", response.data);
  console.log("response.data.data:", response.data?.data); 

  return response.data.data; // <-- THIS assumes backend responds with `{ data: { ... } }`
};

