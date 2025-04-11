import { GbifSearchResponse } from "@/app/interfaces/data.interface"
import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../thunks/dataThunk";

type DataState = {
  data: GbifSearchResponse | null;
  loading: boolean;
  error: string | null;
};

const dataInitialState: DataState = {
  data: null,
  loading: false,
  error: null
};

const dataSlice = createSlice({
  name: "data",
  initialState: dataInitialState,
  reducers: {
    /**
     * Limpa o state de data, definindo data como null,
     * loading como false e error como null.
     */
    clearData(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    }
  },
  /**
   * Define como o state de data será alterado quando
   * uma ação de busca de dados for disparada.
   * Caso a busca esteja pendente, loading será true e error será null.
   * Caso a busca seja realizada com sucesso, data será o resultado da busca,
   * loading será false e error será null.
   * Caso a busca falhe, loading será false e error será o erro ocorrido.
   */
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      });
    builder
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching data";
      });
  },
});

export const { clearData } = dataSlice.actions;
export default dataSlice.reducer;