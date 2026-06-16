import { MENU_LIST } from "@/data/constants";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface IBreadcrumbItem {
  labelKey: string;
  route?: string;
}

const EXTRA_BREADCRUMBS: Record<string, IBreadcrumbItem[]> = {
  "/report-student": [
    { labelKey: "management" },
    { labelKey: "management_students", route: "/students" },
    { labelKey: "breadcrumb_report_student" },
  ],
};

function normalizePath(pathname: string) {
  if (pathname === "/" || pathname === "") return "/home";
  return pathname;
}

function getSubMenuLabelKey(name: string[] | string) {
  return Array.isArray(name) ? name[0] : name;
}

function buildBreadcrumbs(pathname: string): IBreadcrumbItem[] {
  const currentPath = normalizePath(pathname);

  if (EXTRA_BREADCRUMBS[currentPath]) {
    return EXTRA_BREADCRUMBS[currentPath];
  }

  const homeItem = MENU_LIST.find((item) => item.route === "/" || item.route === "/home");
  if (currentPath === "/home") {
    return homeItem ? [{ labelKey: homeItem.name }] : [];
  }

  const directItem = MENU_LIST.find((item) => item.route === currentPath);
  if (directItem) {
    return [{ labelKey: directItem.name }];
  }

  for (const menuItem of MENU_LIST) {
    const subMenuItem = menuItem.subMenu.find((subItem) => subItem.route === currentPath);
    if (!subMenuItem) continue;

    const breadcrumbs: IBreadcrumbItem[] = [];

    if (menuItem.route !== "NO" && menuItem.route) {
      breadcrumbs.push({ labelKey: menuItem.name, route: menuItem.route });
    } else {
      breadcrumbs.push({ labelKey: menuItem.name });
    }

    breadcrumbs.push({ labelKey: getSubMenuLabelKey(subMenuItem.name) });
    return breadcrumbs;
  }

  return [];
}

export function useBreadcrumb() {
  const location = useLocation();
  const navigate = useNavigate();

  const items = useMemo(() => buildBreadcrumbs(location.pathname), [location.pathname]);

  const navigateTo = (route: string) => {
    navigate(route);
  };

  return { items, navigateTo };
}
