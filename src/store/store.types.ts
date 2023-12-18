export type ActionMeta = {
  arg: {
    endpointName: string;
    originalArgs: object;
  };
  requestId: string;
  requestStatus: string;
};

export type ActionErrorPayload = {
  data: {
    message: string;
  };
  status: number | string;
};

export const RequestStatus = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
} as const;
