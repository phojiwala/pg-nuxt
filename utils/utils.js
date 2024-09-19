import { clsx } from "clsx";
import { Home, LineChart, Package, ShoppingCart, Users } from 'lucide-vue-next';
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr,
  locale = 'en-US',
) => {
  const date = new Date(dateStr);
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue) => {
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const navItems = [
  {
    title: 'Blind Details',
    link: '/details',
    icon: () => h(Home, { class: "h-4 w-4" }),
  },
  {
    title: 'Licensee Accounts',
    link: '/accounts',
    icon: () => h(ShoppingCart, { class: "h-4 w-4" }),
  },
  {
    title: 'Law Enforcement',
    link: '/enforcements',
    icon: () => h(Package, { class: "h-4 w-4" }),
  },
  {
    title: 'Announcement',
    link: '/announcement',
    icon: () => h(Users, { class: "h-4 w-4" }),
  },
  {
    title: 'Settings',
    link: '/settings',
    icon: () => h(LineChart, { class: "h-4 w-4" }),
  }
];