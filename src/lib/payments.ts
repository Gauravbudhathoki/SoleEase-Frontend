import { api } from './api';

interface EsewaFormFields {
  gatewayUrl: string;
  fields: Record<string, string>;
}

export const initiateEsewaPayment = (orderId: string) =>
  api.post<EsewaFormFields>('/payments/esewa/initiate', { orderId });

export const verifyEsewaPayment = (data: string) =>
  api.post<{ _id: string }>('/payments/esewa/verify', { data });
