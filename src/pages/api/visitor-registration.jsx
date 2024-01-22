// 来客者入力情報登録　dataは配列ではない
// pages/api/visitor-registration.jsx
import { openDatabase } from "../../util/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // POSTリクエストからデータを取得
      const { data } = req.body;

      // 取得したデータが存在するかチェック
      if (!data || !Array.isArray(data)) {
        return res.status(400).json({ message: "Bad Request" });
      }

      // データベースに接続
      const db = await openDatabase();

      // トランザクション開始
      await db.run("BEGIN TRANSACTION");

      try {
        // 来客者情報テーブルへのデータ挿入
        await db.run(
          "INSERT INTO Visitors (VisitorName, Company) VALUES (?, ?)",
          [data.visitorName, data.company]
        );

        // 入退館管理情報テーブルへのデータ挿入
        await db.run(
          "INSERT INTO table2 (VisitorStatus, EntryDateTime, Attender) VALUES (?, ?, ?)",
          ["入館手続き前", data.entryDateTime, data.Attender]
        );

        // トランザクションコミット
        await db.run("COMMIT");

        // データベース接続を閉じる
        await db.close();

        // 成功時にステータスコード201とメッセージを返す
        res
          .status(201)
          .json({ message: data.visitorName + "さんの登録が完了しました！" });
      } catch (error) {
        // トランザクションロールバック
        await db.run("ROLLBACK");

        // エラーを再スロー
        throw error;
      }
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    // サポートしていないメソッドへの対応
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
