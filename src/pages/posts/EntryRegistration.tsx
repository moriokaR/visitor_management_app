import Head from "next/head";
import Link from "next/link";


export default function FirstPost() {
    return (
        <div>
            <Head>
                <title>入館登録画面</title>
            </Head>
            <h1>入館登録画面！</h1>
            <Link href="/">ホームへ戻る</Link>
        </div>
    );
}