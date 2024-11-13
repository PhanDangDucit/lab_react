import { useEffect } from "react";
import { useState } from "react";
import Table from "./TableQuery";

export function TimKiem() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:3500/search?q=${query}`);
            setData(res.data);
        };
        if (query.length === 0 || query.length > 2) fetchData();
    }, [query]);
  
    return (
      <div className="app">
          <input
            className="search"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        {<Table data={data} />}
      </div>
    );
  }
  