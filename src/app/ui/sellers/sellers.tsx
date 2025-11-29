import { fetchSellersInfo } from "@/app/lib/data";
import { User } from '@/app/lib/definitions';

export default async function SellerWrapper() {
    const sellers = (await fetchSellersInfo()) as User[];

    return(
        <>
            {sellers.map((seller) => (
                <li key={seller.id}>{seller.friendly_name}</li>
            ))}
        </>
    )
}