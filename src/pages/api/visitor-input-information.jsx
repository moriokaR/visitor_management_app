// pages/api/visitor-input-information.jsx

import { openDatabase } from "../../util/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // データベースに接続
      const db = openDatabase();

      try {
        // トランザクション開始
        db.exec("BEGIN");

        const entryexitManagementsData = db
          .prepare(
            "SELECT VisitorID, EntryDateTime, Attender FROM EntryExitManagements WHERE VisitorStatus = ?"
          )
          .all("入館手続き前");

        // visitorIDsを取り出し
        const visitorIDs = entryexitManagementsData.map(
          (entry) => entry.VisitorID
        );

        // 取得したVisitorIDを使って動的にSQLクエリを構築
        const query = `SELECT VisitorID, VisitorName, Company FROM Visitors WHERE VisitorID IN (${visitorIDs.join(
          ", "
        )})`;

        const visitorsData = db.prepare(query).all();

        const combinedData = entryexitManagementsData.map((entry) => {
          const visitorInfo = visitorsData.find(
            (visitor) => visitor.VisitorID === entry.VisitorID
          );
          return {
            visitorID: entry.VisitorID,
            entryDateTime: entry.entrydatetime,
            attender: entry.attender,
            visitorName: visitorInfo ? visitorInfo.visitorname : null,
            company: visitorInfo ? visitorInfo.company : null,
          };
        });
        // トランザクションコミット
        db.exec("COMMIT");

        // 成功時にステータスコード200とメッセージを返す
        res.status(200).json({ data: combinedData });
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
