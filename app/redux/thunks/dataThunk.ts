import { GbifSearchResponse } from "@/app/interfaces/data.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IFetchParams {
  q: string;
  limit?: number;
  offset?: number;
  page?: number;
}

export const fetchData = createAsyncThunk<GbifSearchResponse, IFetchParams>(
  "data/fetchData",
  async ({ q, limit = 15, offset = 0, page = 1 }) => {
    const response = await fetch(
      `https://api.gbif.org/v1/species/search?q=${encodeURIComponent(
        q
      )}&status=ACCEPTED&page=${page}&limit=${limit}&offset=${offset}`
    );

    const data = await response.json();

    return data;
  }
);
