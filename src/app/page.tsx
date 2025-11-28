import Image from "next/image";
import styles from "./ui/page.module.css";
import { Metadata } from "next";
import { lusitana } from '@/app/ui/fonts';
import {
  fetchCatalog,
  fetchCategories,
  fetchGenders,
  fetchAgeGroups,
  fetchSellers,
} from '@/app/lib/data';
import FilterableCards from '@/app/ui/shop/filterable-cards';


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

          {/* <h1 className={`${lusitana.className} text-4xl font-bold mt-6`}>
            HANDCRAFTED HAVEN
          </h1>*/}

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