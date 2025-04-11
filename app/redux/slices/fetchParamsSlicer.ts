import { Taxon } from "@/app/interfaces/taxon.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FetchParamsState = {
  selectedItem: Partial<Taxon> | Taxon | null;
}

const fetchParamsInitialState: FetchParamsState = {
  selectedItem: null
};

const fetchParamsSlice = createSlice({
  name: "fetchParams",
  initialState: fetchParamsInitialState,
  reducers: {
    /**
     * Define o item selecionado no estado, que será usado
     * para filtrar os dados buscados da API.
     *
     * @param {Partial<Taxon> | Taxon | null} selectedItem - O item selecionado a ser
     * definido no estado. Se for nulo, o item selecionado será limpo.
     */
    setSelectedItem(state, action: PayloadAction<Partial<Taxon> | Taxon | null>) {
      state.selectedItem = action.payload;
    },
    /**
     * Limpa o item selecionado do estado, removendo todos os filhos
     * e fazendo com que a busca seja feita sem filtro.
     */
    clearSelectedItem(state) {
      state.selectedItem = null;
    }
  }
});


export const {
  setSelectedItem,
  clearSelectedItem
} = fetchParamsSlice.actions;

export default fetchParamsSlice.reducer;