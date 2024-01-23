// pages/api/visitor-registration.jsx
import { openDatabase } from "../../util/db";

export default async function handler(req, res) {
  console.log("受け取りました");

  if (req.method === "POST") {
    try {
      // POSTリクエストからデータを取得
      const { data } = req.body;

      // 取得したデータが存在するかチェック
      if (data.visitorName !== "テスト一号君") {
        console.log(data.visitorName);
        return res.status(400).json({ message: `${data.visitorName} さんの登録に失敗しました` });
      }

      // データベースに接続
      console.log("DBをオープンしました");
      const db = openDatabase();
      console.log(db);
      console.log("DBをオープンできました");

      try {
        console.log("トライに入りました");

        // トランザクション開始
        db.exec("BEGIN");
        console.log("ここまで到達できました１");

        // 来客者情報テーブルへのデータ挿入
        db.prepare("INSERT INTO Visitors (VisitorName, Company) VALUES (?, ?)")
          .run(data.visitorName, data.company);

        // 入退館管理情報テーブルへのデータ挿入
        db.prepare(
          "INSERT INTO entryexitManagements (VisitorStatus, EntryDateTime, Attender) VALUES (?, ?, ?)"
        ).run("入館手続き前", data.entryDateTime, data.attender);

        // トランザクションコミット
        db.exec("COMMIT");

        console.log("ここまで到達できました２");

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