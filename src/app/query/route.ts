import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listCatalog() {
    const data = await sql`
        SELECT products.product_name, products.price
        FROM products
        ORDER BY products.product_name
    `;
    return data;
}

export async function GET() {
    try {
        return Response.json(await listCatalog());
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
