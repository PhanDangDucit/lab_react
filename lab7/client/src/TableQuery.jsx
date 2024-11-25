import { Link } from "react-router-dom";

const Table = ({ data }) => {
    return (
      <table>
        <tbody>
          <tr>
            <th>Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
          </tr>
          {data.map((item) => (
            <tr key={item.id}>
                <td>
                  <img src={item.hinh} className="table_hinh_sp_search"/>
                </td>
                <td>
                  <Link to={`/sp/${item.id}`}>
                    {item.ten_sp}
                  </Link>
                </td>
                <td><p>{Number(item['gia']).toLocaleString("vi")} đ</p></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;