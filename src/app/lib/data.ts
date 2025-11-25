import postgres from 'postgres';
import { Product } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchCatalog(): Promise<Product[]> {
  try {
    console.log('Fetching catalog data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Product[]>`
      SELECT
        id,
        product_name AS "Product_Name",
        price AS "Price",
        description AS "Description",
        image_url AS "Image_URL",
        user_id AS "User_ID"
      FROM products
      ORDER BY product_name
    `;

    console.log('Catalog data fetched:', data);
    return data;
  } catch (error) {
    console.error('Error fetching catalog data:', error);
    throw new Error('Failed to fetch catalog data');
  }
}
