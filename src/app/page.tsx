import Image from "next/image";
import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Logo */}
        <div className={styles.intro}>
          <div className="hero">
           <Image
              src="/hero.jpg"
              alt="handcrafted soap hero image"
              width={1600}
              height={600}
            />
          </div>
          <h1>Start!</h1>
          <ul>
            <li>Ben</li>
            <li>Christina</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
