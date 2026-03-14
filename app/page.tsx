import { Suspense } from "react";
import Loading from "./loading";
import CryptoTable from "./components/Table/Table";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white">
        <h2>📊 Crypto Market Data</h2>
        <Suspense fallback={<Loading />}>
          <CryptoTable />
        </Suspense>
        <a className=" text-black" href="http://https://www.coingecko.com/" target="_blank" rel="noopener noreferrer">Tabel Powered by CoinGecko 2026.</a>
      </main>
    </div>
  );
}
