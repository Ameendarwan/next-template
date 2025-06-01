"use client";
import { updateLang } from "@/store/apis/users/userSlice";
import { useDispatch } from "react-redux";

import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select/Select";
import { useCurrentLanguage } from "@/i18n/i18n.utils";
import { Language } from "@/types";

const Navbar = (props: { isLogin: boolean }) => {
  const { currLanguage } = useCurrentLanguage();
  const dispatch = useDispatch();

  const { isLogin } = props;

  const languages = [
    { label: "العربية", code: "ar", flag: "AR" },
    { label: "English", code: "en", flag: "EN" },
  ];

  return (
    <>
      {isLogin && (
        <nav className="relative ">
          <div className="px-4 sm:px-6 lg:px-8 bg-[#161525] w-full absolute shadow-lg">
            <div className="flex h-14 md:h-16 justify-between items-center">
              <div className="flex items-center">
                <div className="shrink-0 flex  items-center">
                  <Image
                    src="/logo-main.svg"
                    alt="Company Logo"
                    width={50}
                    height={50}
                  />
                  <Link
                    href={`/auth/sign-in`}
                    className="block rounded-md  pl-2 pr-3 py-2 text-base  text-white cursor-pointer font-serif font-semibold"
                    aria-current="page"
                  >
                    Budgetwise
                  </Link>
                </div>
              </div>
              <div className="flex items-center text-white">
                <Select
                  value={currLanguage}
                  onValueChange={(value) => {
                    localStorage.setItem("lang", value);
                    dispatch(updateLang(value as Language));
                  }}
                >
                  <SelectTrigger
                    className={`w-auto font-bold  bg-transparent border-0 gap-3`}
                  >
                    <SelectValue
                      placeholder="Select Language"
                      className="font-bold "
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
