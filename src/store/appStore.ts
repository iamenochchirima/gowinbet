import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MagicToken, TokensPaginated } from "@/@types/tokens";

type AppState = {
  aimagictokens: MagicToken[]
  selectedMagicToken: MagicToken;
  watchListTokens : TokensPaginated;
  setAimagictokens: (payload: MagicToken[]) => void;
  setSelectedMagicToken: (payload: MagicToken) => void;
  setWatchListTokens: (payload: TokensPaginated) => void;
};

const initialState: AppState = {
  aimagictokens: [],
  selectedMagicToken: {} as MagicToken,
  setAimagictokens: () => {},
  setSelectedMagicToken: () => {},
  watchListTokens: {} as TokensPaginated,
  setWatchListTokens: () => {},
};

export const useApp = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,
      setAimagictokens: (payload) =>
        set(() => ({
          aimagictokens: payload,
        })),
      setSelectedMagicToken: (payload) =>
        set(() => ({
          selectedMagicToken: payload,
        })),
      setWatchListTokens: (payload) =>
        set(() => ({
          watchListTokens: payload,
        })),
    }),
    {
      name: "sessionTokens",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
