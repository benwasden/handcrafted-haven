import { Metadata } from "next";
import styles from "@/app/ui/seller.module.css";

export const metadata: Metadata = {
    title: {
        template: 'Sellers %s',
        default: 'Sellers',
    },
    description: 'All sellers listing items in the marketplace.'
};

export default function Page({ children }: { children: React.ReactNode }) {
    return (
        <>
        <div className={styles.className}>
            {children}
        </div>
        </>
    )
}