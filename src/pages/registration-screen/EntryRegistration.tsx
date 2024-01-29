import React from "react";
import { GetServerSideProps } from "next";
import { getVisitorInputInformation } from "../../information-processing/visitor-input-information";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "visitorID", headerName: "visitorID", width: 70 },
  { field: "entryDateTime", headerName: "entryDateTime", width: 200 },
  { field: "attender", headerName: "attender", width: 200 },
  { field: "visitorName", headerName: "visitorName", width: 200 },
  { field: "company", headerName: "company", width: 200 },
];

// VisitorData型の定義
interface VisitorData {
  visitorID: number;
  entryDateTime: string;
  attender: string;
  visitorName: string;
  company: string;
}

interface HomePageProps {
  initialData: VisitorData[];
}

const HomePage: React.FC<HomePageProps> = ({ initialData }) => {
  return (
    <div>
      <h1>InputDateTime Example</h1>

      <div>
        {/* データの表示 */}
        <h2>来客者情報</h2>

        <DataGrid
          rows={initialData}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          getRowId={(row) => row.visitorID}
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  // APIからデータを取得
  const apiResponse = await getVisitorInputInformation();

  // ApiResponse型からVisitorData[]型に変換
  const initialData: VisitorData[] = apiResponse.data;

  return {
    props: {
      initialData,
    },
  };
};

export default HomePage;
