// pages/api/rent-card-information.jsx
import { openDatabase } from "../../util/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // データベースに接続
      const db = openDatabase();

      try {
        // トランザクション開始
        db.exec("BEGIN");

        // 貸出中データの取得
        const rentCardInfomation = db
          .prepare(
            "SELECT type, number FROM EntryCards WHERE rentstatus = ?"
          )
          .all("貸出中");
        // トランザクションコミット
        db.exec("COMMIT");

        // 成功時にステータスコード200とメッセージを返す
        res.status(200).json({ data: rentCardInfomation });
      } catch (error) {
        // エラーが発生した場合、エラーメッセージをコンソールに表示

        // トランザクションロールバック
        db.exec("ROLLBACK");

        // データベース接続を閉じる
        db.close();

        // エラー時にステータスコード500とメッセージを返す
        res.status(500).json({ message: `Internal Server Error` });
      }
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