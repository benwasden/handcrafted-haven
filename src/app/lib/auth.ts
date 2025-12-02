import { betterAuth } from "better-auth";
import { neon } from "@neondatabase/serverless";
import { type GeneratedAlways, Kysely } from "kysely";
import { NeonDialect } from "kysely-neon";
import { nextCookies } from "better-auth/next-js";

interface Database {
    users: {
        id: GeneratedAlways<number>;
        display_name: string | null;
        email: string | null;
        password: string | null;
        usertype_id: number | null;
        friendly_name: string | null;
    };
}

const db = new Kysely<Database>({
    dialect: new NeonDialect({
        neon: neon(process.env.POSTGRES_URL!),
    }),
});

const users = await db.selectFrom("users").selectAll().execute();

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    }
})