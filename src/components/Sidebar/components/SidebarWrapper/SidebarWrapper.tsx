"use client";

import {
  Boxes,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Home,
  Layers,
  Map,
  Target,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/Sidebar/Sidebar";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import LanguageSelector from "@/components/LanguageSelector";
import OnboardingTour from "@/components/OnboardingTour";
import React from "react";
import SidebarFooterContent from "@/components/SidebarFooterContent";
import { SidebarItem } from "./types";
import auth from "@/lib/auth";
import { useCurrentLanguage } from "@/i18n/i18n.utils";
import { useGetOnboardingQuery } from "@/store/apis/users/users";
import { useTranslation } from "react-i18next";
import { userPaths } from "@/utils/constants";

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  const { currLanguage } = useCurrentLanguage();
  const { state, isMobile, toggleSidebar } = useSidebar();

  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  const { data: userOnboarding } = useGetOnboardingQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 0,
  });

  const sidebarItems: SidebarItem[] = [
    {
      id: "dashboard-tab",
      title: t("users.pages.dashboard.page-title"),
      path: userPaths.dashboard,
      icon: <Home />,
      step: 1,
      children: [],
    },

    {
      id: "budget-tab",
      title: t("users.pages.budgets.page-title"),
      path: userPaths.budgets,
      icon: <Map />,
      step: 2,
      children: [],
    },
    {
      id: "categories-tab",
      title: t("users.pages.categories.page-title"),
      path: userPaths.categories,
      icon: <Boxes />,
      step: 3,
      children: [],
    },
    {
      id: "accounts-tab",
      title: t("users.pages.accounts.page-title"),
      path: userPaths.accounts,
      icon: <Layers />,
      step: 4,
      children: [],
    },
    {
      id: "transactions-tab",
      title: t("users.pages.transactions.page-title"),
      path: userPaths.transactions,
      icon: <CreditCard />,
      step: 5,
      children: [],
    },
    {
      id: "goals-tab",
      title: t("users.pages.goals.page-title"),
      path: userPaths.goals,
      icon: <Target />,
      step: 6,
      children: [],
    },
  ];

  useEffect(() => {
    if (!userOnboarding?.account && pathname !== userPaths.accounts) {
      setIsAddingAccount(false);
    }
  }, [userOnboarding, pathname]);

  useEffect(() => {
    const token = auth.token();
    if (!token || auth.isTokenExpired()) {
      router.replace("/auth/sign-in");
    } else {
      setIsAuthenticated(true);
    }
  }, [router, pathname]);

  // Toggle collapsible sections
  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleSelectItem = (item: SidebarItem) => {
    toggleSection(item.title);
    router.push(item.path);

    if (isMobile) {
      toggleSidebar();
    }
  };

  const isExpanded = useMemo(() => state === "expanded", [state]);

  const showOnboarding = useMemo(
    () => !userOnboarding?.account && !isAddingAccount,
    [userOnboarding, isAddingAccount]
  );

  if (!isAuthenticated) {
    return null; // Prevent rendering until authentication is verified
  }

  return (
    <>
      <Sidebar
        side={currLanguage === "en" ? "left" : "right"}
        collapsible={isExpanded ? "offcanvas" : "icon"}
      >
        <SidebarHeader
          className={`px-4  cursor-pointer ${isExpanded ? "py-2" : "py-4"}`}
        >
          <div className="group flex w-full flex-row items-center gap-2 relative">
            {/* Logo (visible if not hovered and not expanded) */}
            {!isExpanded && (
              <div className="transition-opacity duration-300 group-hover:opacity-0">
                <Image
                  src="/logo.PNG"
                  alt="Company Logo"
                  width={25}
                  height={25}
                />
              </div>
            )}

            {/* SidebarTrigger (hidden by default, shown on hover if not expanded) */}
            {!isExpanded && (
              <div className="absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <SidebarTrigger />
              </div>
            )}

            {/* Budgetwise text (only shown when expanded) */}
            {isExpanded && (
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Image
                    src="/logo.PNG"
                    alt="Company Logo"
                    width={50}
                    height={50}
                  />
                  <h2 className="text-lg font-semibold !font-poppins">
                    Budgetwise
                  </h2>
                </div>
                <SidebarTrigger />
              </div>
            )}
          </div>
        </SidebarHeader>

        <SidebarSeparator />

        {/* Sidebar Content */}
        <SidebarContent className="px-3 pt-4">
          <SidebarMenu className="flex flex-col gap-3">
            {sidebarItems.map((item, index) => (
              <SidebarMenuItem
                id={item.id}
                key={index}
                className={`hover:!bg-primary hover:!text-white hover:!rounded-md ${pathname === item.path ? "bg-primary text-white rounded-md" : ""}`}
              >
                <SidebarMenuButton
                  className="hover:!bg-primary hover:!text-white hover:!rounded-md"
                  onClick={() => handleSelectItem(item)}
                >
                  {item.icon} <span className="text-md">{item.title}</span>
                  {item.children.length > 0 &&
                    (openSections[item.title] ? (
                      <ChevronDown className="ml-auto w-4 h-4" />
                    ) : (
                      <ChevronRight className="ml-auto w-4 h-4" />
                    ))}
                </SidebarMenuButton>

                {item.children.length > 0 && openSections[item.title] && (
                  <div className="pl-6">
                    {item?.children?.map((child, idx) => (
                      <SidebarMenuItem key={idx}>
                        <SidebarMenuButton>{child?.title}</SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </div>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarSeparator />

        <LanguageSelector isExpanded={isExpanded} />

        <SidebarSeparator />

        {/* Footer / Profile Section */}
        <SidebarFooter>
          <SidebarFooterContent isExpanded={isExpanded} />
        </SidebarFooter>
      </Sidebar>
      <main className={`flex-1 w-full p-3 relative`}>
        {isMobile && <SidebarTrigger />}
        {showOnboarding && (
          <>
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10 pointer-events-none" />
            <OnboardingTour onAccountAdd={() => setIsAddingAccount(true)} />
          </>
        )}
        <div className={`${showOnboarding && "!pointer-events-none"}`}>
          {children}
        </div>
      </main>
    </>
  );
};

export default SidebarWrapper;
