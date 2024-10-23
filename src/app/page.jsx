import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h1>NextJS Login Register System</h1>
      </div>
    </div>
  );
}
