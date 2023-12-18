export type Todo = {
  id: number;
  todo: string;
  description?: string;
  completed: boolean;
  userId: number;
};

export type PatchTodo = {
  id: number;
  todo?: string;
  description?: string;
  completed?: boolean;
};

export type TodoFormData = {
  todo?: string;
  description?: string;
  completed?: boolean;
  userId?: number;
};

export type ListApiArg = {
  limit?: number;
  skip?: number;
};

export type ListApiResponse<T, K extends string> = Required<ListApiArg> & {
  total: number;
} & {
  [P in K]: T[];
};
