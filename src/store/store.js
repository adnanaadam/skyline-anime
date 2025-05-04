import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAnimeStore = create(
  persist(
    (set) => ({
      wishlist: [],
      addToWishlist: (anime) =>
        set((state) => {
          if (!state.wishlist.some(item => item.mal_id === anime.mal_id)) {
            return { wishlist: [...state.wishlist, anime] };
          }
          return state;
        }),
      removeFromWishlist: (malId) =>
        set((state) => ({
          wishlist: state.wishlist.filter(anime => anime.mal_id !== malId),
        })),
      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: 'anime-wishlist', // LocalStorage key
    }
  )
);

// In your store.js
export const useSearchStore = create(persist(
    (set) => ({
      searchHistory: [],
      addSearch: (query) => 
        set((state) => ({
          searchHistory: [...new Set([query, ...state.searchHistory])].slice(0, 5)
        })),
    }),
    { name: 'search-history' }
  ));