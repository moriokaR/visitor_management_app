// pages/api/entry-registration.jsx
import { openDatabase } from "../util/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // POSTリクエストからデータを取得
      const { data } = req.body;

      // データベースに接続
      const db = openDatabase();

      try {
        // トランザクション開始
        db.exec("BEGIN");

        // 入退館管理情報テーブルへのデータ挿入
        db.prepare(
          "UPDATE entryexitManagements SET VisitorStatus = ?, EntryCardID = ? WHERE VisitorID = ?"
        ).run("入館中", data.entryCardID, data.visitorID);

        // 入館証テーブルへのデータ挿入
        db.prepare(
          "UPDATE entryCards SET RentStatus = ? WHERE EntryCardID = ?"
        ).run("貸出中", data.entryCardID);

        // トランザクションコミット
        db.exec("COMMIT");

        // 成功時にステータスコード201とメッセージを返す
        res
          .status(201)
          .json({ message: `${data.visitorName} さんの入館登録が完了しました！` });
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
