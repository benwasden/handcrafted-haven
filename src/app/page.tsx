import Image from "next/image";
import styles from "./ui/page.module.css";
import { Metadata } from "next";
import {
  fetchCatalog,
  fetchCategories,
  fetchGenders,
  fetchAgeGroups,
  fetchSellers,
} from '@/app/lib/data';
import FilterableCards from '@/app/ui/shop/filterable-cards';
import Link from "next/link";


export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const [products, categories, genders, ageGroups, sellers] = await Promise.all([
    fetchCatalog(),
    fetchCategories(),
    fetchGenders(),
    fetchAgeGroups(),
    fetchSellers(),
  ]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <div className="hero">
            <Image
              src="/hero.jpg"
              alt="handcrafted soap hero image"
              width={1600}
              height={600}
            />
          </div>

          {/* Filter + product grid */}
          <FilterableCards
            products={products}
            categories={categories}
            genders={genders}
            ageGroups={ageGroups}
            sellers={sellers}
          />
        </div>
      </main>
    </div>
  );
}