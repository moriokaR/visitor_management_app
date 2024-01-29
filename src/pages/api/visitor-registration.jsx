// pages/api/visitor-registration.jsx
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

        // 来客者情報テーブルへのデータ挿入
        db.prepare("INSERT INTO Visitors (VisitorName, Company) VALUES (?, ?)")
          .run(data.visitorName, data.company);

        // 入退館管理情報テーブルへのデータ挿入
        db.prepare(
          "INSERT INTO entryexitManagements (VisitorStatus, EntryDateTime, Attender) VALUES (?, ?, ?)"
        ).run("入館手続き前", data.entryDateTime, data.attender);

        // トランザクションコミット
        db.exec("COMMIT");

        // 成功時にステータスコード201とメッセージを返す
        res.status(201).json({ message: `${data.visitorName} さんの登録が完了しました！` });
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