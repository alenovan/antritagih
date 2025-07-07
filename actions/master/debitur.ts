"use server";

import { auth } from "@/lib/auth";
import { DebiturAdditionalType, DebiturType } from "@/lib/zod";
import {
  createDebitur,
  updateDebitur,
  deleteDebitur,
  getDebitur,
  createDebiturAdditional,
  updateDebiturAdditional,
  deleteDebiturAdditional,
} from "@/services/master/debitur";
import { revalidateLocalizedPath } from "@/utils/revalidate";
import { format } from "date-fns";

export const getDebiturAction = async (id: number) => {
  const session = await auth();

  const data = await getDebitur({
    token: session?.user.token as string,
    id,
  });

  return data;
};

export const createDebiturAction = async (data: DebiturType) => {
  const session = await auth();

  const res = await createDebitur({
    token: session?.user.token as string,
    body: {
      ...data,
      last_paid_date: format(data.last_paid_date, "yyyy-MM-dd HH:mm:ss"),
      last_paid_due_date: format(
        data.last_paid_due_date,
        "yyyy-MM-dd HH:mm:ss"
      ),
      due_date: format(data.due_date, "yyyy-MM-dd HH:mm:ss"),
    },
  });

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/master/debitur");

  return {
    status: res.status,
    message: "Debitur Added",
  };
};

export const createDebiturAdditionalAction = async (
  data: DebiturAdditionalType
) => {
  const session = await auth();

  const res = await createDebiturAdditional({
    token: session?.user.token as string,
    body: data,
  });

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/master/debitur/additional");

  return {
    status: res.status,
    message: "Debitur Additional Added",
  };
};

export const updateDebiturAction = async (id: number, data: DebiturType) => {
  const session = await auth();

  const res = await updateDebitur({
    token: session?.user.token as string,
    id,
    body: {
      ...data,
      last_paid_date: format(data.last_paid_date, "yyyy-MM-dd HH:mm:ss"),
      last_paid_due_date: format(
        data.last_paid_due_date,
        "yyyy-MM-dd HH:mm:ss"
      ),
      due_date: format(data.due_date, "yyyy-MM-dd HH:mm:ss"),
    },
  });

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/master/debitur");

  return {
    status: res.status,
    message: "Debitur Updated",
  };
};

export const updateDebiturAdditionalAction = async (
  id: number,
  data: DebiturAdditionalType
) => {
  const session = await auth();

  const res = await updateDebiturAdditional({
    token: session?.user.token as string,
    id,
    body: data,
  });

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/master/debitur/additional");

  return {
    status: res.status,
    message: "Debitur Additional Updated",
  };
};

export const deleteDebiturAction = async (id: number) => {
  const session = await auth();

  const res = await deleteDebitur({
    token: session?.user.token as string,
    id,
  });

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/master/debitur");

  return {
    status: res.status,
    message: "Debitur Deleted",
  };
};

export const deleteDebiturAdditionalAction = async (id: number) => {
  const session = await auth();

  const res = await deleteDebiturAdditional({
    token: session?.user.token as string,
    id,
  });

  if (res.status === false) {
    return {
      status: res.status,
      message: res?.message,
    };
  }

  revalidateLocalizedPath("/master/debitur/additional");

  return {
    status: res.status,
    message: "Debitur Additional Deleted",
  };
};
