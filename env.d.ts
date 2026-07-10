// Secret/var declarations for `c.env`. These are set at runtime via
// `wrangler secret put <NAME>` (production) or `.dev.vars` (local dev).
//
// IMPORTANT: do NOT move these into `wrangler.jsonc` `vars` — that would
// deploy them as plaintext bindings, and `wrangler deploy` overwrites any
// secret with the same name. We learned this the hard way when it wiped
// every secret on the polofield worker.
declare namespace Cloudflare {
  interface Env {
    SLACK_APP_ID: string;
    SLACK_CLIENT_ID: string;
    SLACK_CLIENT_SECRET: string;
    SLACK_SIGNING_SECRET: string;
    SLACK_BOT_TOKEN: string;
    SLACK_CHANNEL_ID: string;
    DISCORD_PUBLIC_KEY: string;
    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
    DISCORD_INVITE_URL: string;
    DISCORD_PERMISSIONS_INTEGER: string;
    DISCORD_TEST_GUILD_ID: string;
    DISCORD_TOKEN: string;
    DISCORD_WEBHOOK_URL: string;
    DISCORD_DIAGNOSTICS_WEBHOOK_URL: string;
    ADMIN_TOKEN: string;
  }
}
