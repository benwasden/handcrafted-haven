import { getSellerById } from "@/app/lib/data";
import ItemCards from "@/app/ui/sellers/itemcards";
import { Suspense } from "react";
import styles from "@/app/ui/seller.module.css";
import { funnel } from "@/app/ui/fonts";

export default async function SellerProfile(props: { params: Promise<{ id: number }>}) {
  const params = await props.params;
  const id = params.id;

  const [sellerArray] = await Promise.all([
    getSellerById(id)
  ]);

  const seller = sellerArray[0];

  return (
    <>
    <div className={styles.sellerProfile}>
      <div className={styles.innerProfile}>
        <div className={styles.profileColumn}>
          <h1 className={funnel.className}>{seller.friendly_name}</h1>
          <p className={styles.bio}>{seller.description}</p>
          </div>
        <div className={styles.profileColumn}>
          <h2 className={styles.profileListings}>Items for Sale by this Vendor:</h2>
          <Suspense>
            <ItemCards id={id} />
          </Suspense>
        </div>
      </div>
    </div>
    </>
);
}
