import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { users } from "../lib/users-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
const insertedUsers = await Promise.all(
    users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return sql `
        INSERT INTO users (id, display_name, email, password, usertype_id, friendly_name)
        VALUES (${user.id}, ${user.display_name}, ${user.email}, ${hashedPassword}, ${user.usertype_id}, ${user.friendly_name})
        ON CONFLICT (id) DO NOTHING`;
    })
)
}

export async function GET() {
    try {
        const result = await sql.begin((sql) => [
            seedUsers()
        ]);

        return Response.json({ message: 'Database seeded successfully' })
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}