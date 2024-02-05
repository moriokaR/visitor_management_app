// pages/api/rent-card-information.jsx
import { openDatabase } from "../../util/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // データベースに接続
      const db = openDatabase();

      // 貸出中データの取得
      const rentCardInformation = db
        .prepare("SELECT type, number FROM EntryCards WHERE rentStatus = ?")
        .all("貸出中");

      // 成功時にステータスコード200とメッセージを返す
      res.status(200).json({ data: rentCardInformation });
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
