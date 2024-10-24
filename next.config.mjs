/** @type {import('next').NextConfig} */

import path from "path";
import { fileURLToPath } from "url";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  // i18n: {
  //   locales: ["en", "fr", "es", "de", "it", "cn", "tr", "ru", "pt", "in"],
  //   defaultLocale: "en",
  //   localeDetection: false,
  // },
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "app", "styles")],
  },
};

export default withNextIntl(nextConfig);
