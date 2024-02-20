// pages/api/exit-registration.jsx
import { openDatabase } from "../../util/db";

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
          "UPDATE entryExitManagements SET VisitorStatus = ?, ExitUser = ?, ExitDateTime = ?, Comment = ? WHERE VisitorID = ?"
        ).run("退館済", data.ExitUser, data.ExitDateTime, data.Comment, data.VisitorID);

        // 入館証テーブルへのデータ挿入
        // IDが99の時、RentStatusは"未貸出"で登録される。
        // 基本は"貸出可"
        db.prepare(
          "UPDATE entryCards SET RentStatus = ? WHERE EntryCardID = ?"
        ).run(data.RentStatus, data.EntryCardID);

        // トランザクションコミット
        db.exec("COMMIT");

        // 成功時にステータスコード201とメッセージを返す
        res
          .status(201)
          .json({ message: [] });
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
