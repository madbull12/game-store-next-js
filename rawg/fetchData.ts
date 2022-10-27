const fetchData = async<T>(url:string):Promise<T> => {
    const res = await fetch(`${url}key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`);
    const data = await res.json();

    return data;
}

export default fetchData