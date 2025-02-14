
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { DesktopNav } from "./navigation/DesktopNav";
import { MobileNav } from "./navigation/MobileNav";
import { mainNavItems } from "@/config/navigation";

export const Sidebar = () => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && <DesktopNav navItems={mainNavItems} currentPath={pathname} />}
      {isMobile && <MobileNav navItems={mainNavItems} currentPath={pathname} />}
    </>
  );
};
