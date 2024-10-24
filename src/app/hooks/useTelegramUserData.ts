import { ITelegramUserData } from "@/types/telegram";
import WebApp from "@twa-dev/sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useTelegramUserData(): ITelegramUserData | null {
  const [userData, setUserData] = useState<ITelegramUserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof WebApp !== "undefined" && WebApp.initDataUnsafe?.user) {
      setUserData(WebApp.initDataUnsafe.user as ITelegramUserData);
    } else {
      const telegramBotUrl =
        process.env.NEXT_PUBLIC_BOT_URL || "bot_url_not_specified";
      router.push(telegramBotUrl);
    }
  }, [router]);

  return userData;
}
