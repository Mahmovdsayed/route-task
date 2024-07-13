import MoreData from "@/components/sections/MoreData";
import Tablee from "@/components/sections/table/Table";
import Image from "next/image";

export default function Home() {
  return <>
    <main className="container mx-auto p-6">
      <MoreData />
      <Tablee />
    </main>
  </>
}
