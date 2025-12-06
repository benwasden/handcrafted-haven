import postgres from 'postgres';
import { Product, Category, Gender, Age_Groups, User, ReviewWithUser, Products } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchCatalog(): Promise<Product[]> {
  try {
    // console.log('Fetching catalog data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Product[]>`
      SELECT
        id,
        product_name AS "Product_Name",
        price AS "Price",
        description AS "Description",
        image_url AS "Image_URL",
        category_id AS "Category_ID",
        age_group_id AS "Age_Group_ID",
        gender_id AS "Gender_ID",
        user_id AS "User_ID"
      FROM products
      ORDER BY product_name
    `;

    // console.log('Catalog data fetched:', data);
    return data;
  } catch (error) {
    // console.error('Error fetching catalog data:', error);
    throw new Error('Failed to fetch catalog data');
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    // console.log('Fetching categories data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await sql<Category[]>`
      SELECT
        id,
        category_name AS "Category_Name"
      FROM category
      ORDER BY category_name
        `;
    // console.log('Categories data fetched:', data);
    return data;
  } catch (error) {
    // console.error('Error fetching categories data:', error);
    throw new Error('Failed to fetch categories data');
  }
}

export async function fetchGenders(): Promise<Gender[]> {
  try {
    // console.log(`Fetching gender data...`);
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await sql<Gender[]>`
      SELECT
        id,
        gender AS "Gender"
      FROM gender
      ORDER BY gender
        `;
    // console.log('Gender data fetched:', data);
    return data;
  } catch (error) {
    // console.error('Error fetching gender data:', error);
    throw new Error('Failed to fetch gender data');
  }
}

export async function fetchAgeGroups(): Promise<Age_Groups[]> {
  try {
    // console.log(`Fetching age groups data...`);
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await sql<Age_Groups[]>`
      SELECT
        id,
        age_range AS "Age_Range"
      FROM age_groups
      ORDER BY age_range
        `;
    // console.log('Age groups data fetched:', data);
    return data;
  } catch (error) {
    // console.error('Error fetching age groups data:', error);
    throw new Error('Failed to fetch age groups data');
  }
}

export async function fetchSellers(): Promise<User[]> {
  try {
    // console.log(`Fetching sellers data...`);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await sql<User[]>`
      SELECT
        id,
        display_name AS "display_name",
        friendly_name
      FROM users
      WHERE usertype = 'seller'
      ORDER BY display_name
        `;
    // console.log('Sellers data fetched:', data);
    return data;
  } catch (error) {
    // console.error('Error fetching sellers data:', error);
    throw new Error('Failed to fetch sellers data');
  }
}

export async function fetchSellersInfo(): Promise<User[]> {
  try {
    // console.log(`Fetching sellers data...`);
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await sql<User[]>`
      SELECT
        id,
        display_name AS "display_name",
        email,
        friendly_name
      FROM users
      WHERE usertype = 'seller'
      ORDER BY display_name
        `;
    // console.log('Sellers data fetched:', data);
    return data;
  } catch (error) {
    // console.error('Error fetching sellers data:', error);
    throw new Error('Failed to fetch sellers data');
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Product[]>`
      SELECT
        p.id,
        p.product_name AS "Product_Name",
        p.price        AS "Price",
        p.description  AS "Description",
        p.image_url    AS "Image_URL",
        p.user_id      AS "User_ID",
        s.friendly_name AS "Seller_Name"
      FROM products p
      JOIN users s ON p.user_id = s.id
      WHERE p.id = ${id}
      LIMIT 1
    `;

    return data[0] ?? null;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw new Error("Failed to fetch product data");
  }
}




export async function getRatingsByProductId(
  productId: string
): Promise<ReviewWithUser[]> {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<ReviewWithUser[]>`
      SELECT
        r.id,
        r.rating,
        r.comment,
        r.product_id,
        r.user_id,
        u.display_name AS "Rater_Name"
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.product_id = ${productId}
      ORDER BY r.id DESC
    `;

    return data;
  } catch (error) {
    console.error("Error fetching product rating data:", error);
    throw new Error("Failed to fetch product rating data");
  }
}


export async function addReview(
  productId: string,
  userId: string,
  rating: number,
  comment: string
) {
  try {
    await sql`
      INSERT INTO reviews (product_id, user_id, rating, comment)
      VALUES (${productId}, ${userId}, ${rating}, ${comment})
    `;
  } catch (error) {
    console.error("Error adding review:", error);
    throw new Error("Failed to add review");
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const data = await sql<User[]>`
      SELECT
        id,
        display_name AS "display_name",
        email,
        friendly_name
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;

    return data[0] ?? null;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to fetch user");
  }
}

export async function getSellerById(id: number): Promise<User[]> {
  try {
    // console.log(`Fetching sellers data...`);
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await sql<User[]>`
      SELECT
        id,
        friendly_name
      FROM users
      WHERE id = ${id}
      ORDER BY display_name
        `;
    // console.log('Sellers data fetched:', data);
    return data;
  } catch (error) {
    // console.error('Error fetching sellers data:', error);
    throw new Error('Failed to fetch sellers data');
  }
}

export async function getProductsBySellerId(id: number): Promise<Products[]> {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Products[]>`
      SELECT
        id,
        product_name,
        price,
        image_url,
        user_id
      FROM products
      WHERE user_id = ${id}
    `;
      return data ?? null;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw new Error("Failed to fetch product data");
  }
}