import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1/subscriptions";

interface SubscriptionData {
  // Define the expected properties, for example:
  name: string;
  price: number;
  startDate: string;
  // Add other fields as needed
}

export const createSubscription = async (data: SubscriptionData, token: string) => {
  const response = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
