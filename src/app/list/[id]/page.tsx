import { Suspense } from "react";
import ItemsTable from "@/app/ui/sellers/itemstable";
import { getSellerById } from "@/app/lib/data";
import Link from "next/link";
import styles from "@/app/ui/list.module.css";
import { funnel } from "@/app/ui/fonts";

export default async function ListPage(props: { params: Promise<{ id: number }>}) {
    const params = await props.params;
      const id = params.id;
    
      const [sellerArray] = await Promise.all([
        getSellerById(id)
      ]);

      const seller = sellerArray[0];

    return (
        <>
        <div className={styles.itemsTable}>
            <h1 className={funnel.className}>{seller.friendly_name} Products:</h1>
            <div className={styles.buttonWrapper}>
              <Link href={`/list/${id}/add`} className={styles.addItem}>Add Item</Link>
            </div>
            <Suspense key={seller.friendly_name + id}>
                <ItemsTable id={id} />
            </Suspense>
        </div>
        </>
    )
}