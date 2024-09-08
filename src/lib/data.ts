export const footerDataColOne = [
  { id: 1, title: "Buy", url: "/buy" },
  { id: 2, title: "Sell", url: "/sell" },
  { id: 3, title: "Rent", url: "/rent" },
  { id: 4, title: "Short let", url: "/shortlet" },
  { id: 5, title: "All listings", url: "/all" },
];

export const footerDataColTwo = [
  { id: 1, title: "About", url: "/about" },
  { id: 2, title: "Become an agent", url: "/agent" },
  { id: 3, title: "How it works", url: "/how-it-works" },
  { id: 4, title: "Blog", url: "/blog" },
  { id: 5, title: "FAQ", url: "/faq" },
  { id: 6, title: "Help Center", url: "/help-center" },
];

type NavList = {
  id: number;
  title: string;
  url: string;
  withIcon: boolean;
  isButton: boolean;
  children: boolean;
  iconName?: string | undefined;
};

export const navLists: NavList[] = [
  {
    id: 1,
    title: "Home",
    url: "/",
    withIcon: false,
    isButton: false,
    children: false,
  },
  {
    id: 2,
    title: "Listings",
    url: "/listings",
    withIcon: true,
    iconName: "ChevronDown",
    isButton: false,
    children: true,
  },
  {
    id: 3,
    title: "Lands",
    url: "/lands",
    withIcon: false,
    isButton: false,
    children: false,
  },
  {
    id: 4,
    title: "About us",
    url: "/about",
    withIcon: false,
    isButton: false,
    children: false,
  },
  {
    id: 5,
    title: "Blog",
    url: "/blog",
    withIcon: false,
    isButton: false,
    children: false,
  },
  {
    id: 6,
    title: "List property",
    url: "/list",
    withIcon: true,
    isButton: true,
    children: false,
  },
];

export const popoverItems = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
];
