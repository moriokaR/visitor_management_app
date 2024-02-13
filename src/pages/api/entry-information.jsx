// pages/api/entry-information.jsx
import { openDatabase } from "../../util/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // データベースに接続
      const db = openDatabase();

      // 入館中情報取得

      const entryInformation = db
        .prepare(
          "SELECT B.VisitorID, B.EntryCardID, B.EntryDateTime, B.Attender, A.VisitorName, A.Company, C.type, C.number  FROM Visitors AS A INNER JOIN EntryExitManagements AS B ON A.VisitorID = B.VisitorID INNER JOIN EntryCards AS C ON B.EntryCardID = C.EntryCardID WHERE B.VisitorStatus = ?"
        )
        .all("入館中");

      // 成功時にステータスコード200とメッセージを返す
      res.status(200).json({ data: entryInformation });
    } catch (error) {
      // POSTリクエストからデータを取得できなかった場合のエラー処理
      console.error("データ取得エラー:", error);
      res.status(400).json({ message: "Bad Request" });
    }
  } else {
    // サポートしていないメソッドへの対応
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
