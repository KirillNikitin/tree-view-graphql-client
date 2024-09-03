import Image from "next/image";
import styles from "./page.module.css";

import LeftSideBar from "./left-side-bar";
import MainContent from "./main-content";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {

  return (
    <>
      <div className="fixed top-2 right-2">
        <ModeToggle />
      </div>
      <div className="left-sidebar-grid min-h-screen">
        <MainContent />
        <LeftSideBar />
      </div>
    </>
  )
}