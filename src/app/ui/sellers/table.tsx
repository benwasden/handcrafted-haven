import { fetchSellersInfo } from "@/app/lib/data";
import { User } from '@/app/lib/definitions';
import Link from "next/link";
import { funnel } from "@/app/ui/fonts";
import styles from "@/app/ui/seller.module.css";

export default async function SellersTable() {
    const sellers = (await fetchSellersInfo()) as User[];
    return (
        <table className={styles.sellersTable}>
            <thead>
                <tr className={funnel.className} id={styles.tableHead}>
                    <th>Business</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {sellers?.map((seller) => (
                    <tr key={seller.id}>
                        <td><Link href={`/sellers/${seller.id}`} id="seller-friendly">{seller.friendly_name}</Link></td>
                        <td>{seller.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}