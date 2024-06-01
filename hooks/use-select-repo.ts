import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Repository } from "@/types";
interface RepositoryStore {
  item: Repository;
  replaceItem: (data: Repository) => void;
  removeAll: () => void;
}

const useRepository = create(
  persist<RepositoryStore>(
    (set, get) => ({
      item: {
        name: "",
        fullName: "",
        url: "",
        ownerName: "",
      },
      replaceItem: (data: Repository) => {
        set({ item: data });
      },
      removeAll: () =>
        set({
          item: {
            name: "",
            fullName: "",
            url: "",
            ownerName: "",
          },
        }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useRepository;
