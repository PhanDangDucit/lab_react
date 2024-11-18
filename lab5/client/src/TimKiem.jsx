import { useEffect } from "react";
import { useState } from "react";
import Table from "./TableQuery";

export function TimKiem() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
          const res = await (await fetch(`http://localhost:3500/listsp`)).json();
          console.log("res: ", res);
          if(data.length == 0 && query.length == 0) {
            setData(res.slice(0, 6))
          } else {
            console.log("query:", query);
            // console.log("res at query: ", res)
            const dataQuery = res.filter(data => {
              // console.log("tensp: ", data.ten_sp)
              return data.ten_sp.includes(query)
            });
            console.log("dataQuery: ", dataQuery);
            setData(dataQuery.slice(0, 6))
          }
      };
      fetchData();
    }, [query, query.length]);

    // console.log("data:", data);
  
    return (
      <div className="app">
        <input
          className="search"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        { data && data.length > 0 && <Table data={data} /> }
      </div>
    );
  }
  