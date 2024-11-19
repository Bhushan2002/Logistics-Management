"use server";

import { authOptions } from "@/lib/auth-options";
import axios, { Axios, AxiosError, AxiosRequestConfig } from 'axios';
import { getServerSession } from "next-auth";

const baseURL = process.env.SERVER_BASE_URL;

type ApiHeaders = {
  "Content-Type": string;
  "Authorization"?: string;
};


async function getDefaultHeaders(): Promise<ApiHeaders> {
  const session = await getServerSession(authOptions);
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${session?.accessToken ?? ''}`
  };
}

const api = axios.create({
  baseURL,
  headers: {}
});

async function initializeApi() {
  api.defaults.headers = Object.assign({}, api.defaults.headers, await getDefaultHeaders());
}

// Define a generic function for handling API requests
async function apiRequest<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    await initializeApi();
    const response = await api(config);
    return ({
      success: true,
      error: null,
      data: response.data.data,
      message: "Success"
    }) as T
  } catch (error) {
    return ({
      error: true,
      success: false,
      data: null,
      message: "Something went wrong!"
    }) as T
  }
}

export async function get<T>(url: string): Promise<T> {
  const config: AxiosRequestConfig = {
    method: "GET",
    url
  }

  return apiRequest<T>(config);
}

export async function post<T, D, V>(url: string, data: D): Promise<T> {
  const config: AxiosRequestConfig = {
    method: "POST",
    url,
    data: data
  }

  return apiRequest<T>(config);
}

export async function put<T, D, V>(url: string, data: D): Promise<T> {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url,
    data: data
  }

  return apiRequest<T>(config);
}

export async function remove<T>(url: string): Promise<T> {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url,
  }

  return apiRequest<T>(config);
}