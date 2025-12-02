import { fetchSellersInfo } from "@/app/lib/data";
import { User } from '@/app/lib/definitions';
import Link from "next/link";

export default async function SellersTable() {
    const sellers = (await fetchSellersInfo()) as User[];
    return (
        <table>
            <thead>
                <tr>
                    <th>Business</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {sellers?.map((seller) => (
                    <tr key={seller.id}>
                        <td><Link href={`/sellers/${seller.id}`}>{seller.friendly_name}</Link></td>
                        <td>{seller.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}