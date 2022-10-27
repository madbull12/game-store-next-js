import create from 'zustand';

interface Search {
    search:string;
    setSearch:(value:string) => void
}

export const useSearch = create<Search>((set)=>({
    search:"",
    setSearch:(value:string)=>set(()=>({ search: value }))
}))