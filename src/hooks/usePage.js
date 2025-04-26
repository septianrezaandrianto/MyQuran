import {create} from 'zustand';

const usePage = create(set => ({
  page: 'SurahList',
  surahNumber: 1,
  setPage: newPage => set({page: newPage}),
  setSurahNumber: newSurahNumber => set({surahNumber: newSurahNumber}),
}));

export default usePage;
