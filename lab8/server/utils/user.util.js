import { connectDb } from "..";

export const getUserFromDatabase = async({username, pass}) => {
    const db = await connectDb();
    let sql = `SELECT name, password FROM users WHERE name = ? and password = ${pass}`;
    const [result] = await db.query(sql, username, pass);
    console.log("result: ", result);
    return result;
}
export const checkUserPass = async(un, pw) => {
    const user = await getUserFromDatabase({username: un, pass: pw});
    if (user) return true; 
    // if (un=="bb" && pw=="321") return true; 
    return false;
}
export const getUserInfo = async (username, password) => {
    const user = await getUserFromDatabase({username, pass: password});
    if (user) return { "id": "1", "hoten": username}
    // if (username="bb") return { "id": "2", "hoten": "Nguyễn Thụ Lượm"};
    return { "id": "-1", "hoten": ""}
}
