import { ReactNode, useMemo } from "react";

import { usePathname } from "next/navigation";
import Navbar from "../Navbar";

const Portal = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const authPages = useMemo(
    () => [
      "auth/reset-password",
      "auth/sign-in",
      "auth/sign-up",
      "auth/forgot-password",
      "auth/sign-up/success",
      "auth/verification",
      "auth/email-verification",
    ],
    []
  );

  const isAuthPage = useMemo(
    () => authPages.some((path) => pathname.includes(path)),
    [pathname, authPages]
  );

  return (
    <div className="w-full animate-fadein">
      {/* Conditionally render Navbar based on the current route */}
      {isAuthPage && <Navbar isLogin={true} />}
      {/* Conditionally set background color based on the current route */}
      <main className={`w-full ${!isAuthPage ? "bg-[#fafafa]" : "bg-primary"}`}>
        {children}
      </main>
    </div>
  );
};

export default Portal;
