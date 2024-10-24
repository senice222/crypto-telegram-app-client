/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { TLocaleCodes } from "@/types/locales";
import { readdir, readFile } from "fs/promises";
import { cookies } from "next/headers";
import path from "path";
import { cwd } from "process";

const COOKIE_NAME = "NEXT_LOCALE";
const DEFAULT_LOCALE: TLocaleCodes = "en";
const LOCALES_PATH = path.join(cwd(), "src/app/messages");

export async function getUserLocale() {
  return cookies().get(COOKIE_NAME)?.value || DEFAULT_LOCALE;
}

export async function setUserLocale(locale: TLocaleCodes) {
  cookies().set(COOKIE_NAME, locale);
}

interface LocaleMessages {
  [locale: string]: Record<string, any>;
}

function deepMerge(target: any, source: any): any {
  for (const key of Object.keys(source)) {
    if (
      source[key] instanceof Object &&
      key in target &&
      target[key] instanceof Object
    ) {
      target[key] = deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

async function getAllFiles(dir: string, extension: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nestedFiles = await getAllFiles(fullPath, extension);
      files.push(...nestedFiles);
    } else if (entry.isFile() && path.extname(entry.name) === extension) {
      files.push(fullPath);
    }
  }

  return files;
}

export async function importAllLocales(): Promise<LocaleMessages> {
  const localeMessages: LocaleMessages = {};

  const localeDirs = await readdir(LOCALES_PATH, { withFileTypes: true });

  for (const dirent of localeDirs) {
    if (dirent.isDirectory()) {
      const locale = dirent.name;
      const localeDirPath = path.join(LOCALES_PATH, locale);
      localeMessages[locale] = {};

      const jsonFiles = await getAllFiles(localeDirPath, ".json");

      for (const filePath of jsonFiles) {
        try {
          const fileContent = await readFile(filePath, "utf-8");
          const jsonContent = JSON.parse(fileContent);

          deepMerge(localeMessages[locale], jsonContent);
        } catch (error) {
          console.error(`Error reading or parsing ${filePath}:`, error);
        }
      }
    }
  }

  return localeMessages;
}
