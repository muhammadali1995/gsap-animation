import type { Country } from "~/models/country";

export const countries: Country[] = [
  {
    id: "china",
    name: "CHINA 中国",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1920px-Flag_of_the_People%27s_Republic_of_China.svg.png",
    description:
      "China, officially the People's Republic of China, is a country in East Asia. It is the world's most populous country with a population exceeding 1.4 billion.",
    founded: "1949",
    industry: "Government",
    employees: "1.4 billion+",
    revenue: "$17.7 trillion GDP",
    headquarters: "Beijing, China",
    details: {
      companies: [{ name: "Sam's Club" }, { name: "Aldi" }, { name: "Costco" }],
    },
  },
  {
    id: "usa",
    name: "United States 美国",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
    description:
      "The United States of America is a country primarily located in North America. It consists of 50 states, a federal district, and several territories.",
    founded: "1776",
    industry: "Government",
    employees: "331 million+",
    revenue: "$25.4 trillion GDP",
    headquarters: "Washington D.C., USA",
    details: {
      companies: [
        { name: "Best Buy" },
        { name: "CVS" },
        { name: "H Mart" },
        { name: "Kroger" },
        { name: "Mitsuwa" },
        { name: "Ranch Market" },
        { name: "Rite Aid" },
        { name: "Walgreens" },
      ],
    },
  },
  {
    id: "canada",
    name: "Canada 加拿大",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg",
    description:
      "Canada is a country in North America. Its ten provinces and three territories extend from the Atlantic Ocean to the Pacific Ocean and northward into the Arctic Ocean.",
    founded: "1867",
    industry: "Government",
    employees: "38 million+",
    revenue: "$2.1 trillion GDP",
    headquarters: "Ottawa, Canada",
    details: {
      companies: [
        { name: "7-Eleven" },
        { name: "BMR" },
        { name: "Brunet" },
        { name: "Canac" },
        { name: "Canadian Tire" },
        { name: "Costco" },
        { name: "Couche-Tard" },
        { name: "Filgo" },
        { name: "Giant Tiger" },
        { name: "Harnois Énergies" },
        { name: "IGA" },
        { name: "Jean Coutu" },
        { name: "Matériaux Audet" },
        { name: "Maxi" },
        { name: "MP Materials" },
        { name: "Patrick Morin" },
        { name: "Pharmaprix" },
        { name: "Réno-Dépôt" },
        { name: "RONA" },
        { name: "Super C" },
        { name: "Walmart" },
      ],
    },
  },
  {
    id: "australia",
    name: "Australia 澳洲",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Australia.svg",
    description:
      "Australia, officially the Commonwealth of Australia, is a sovereign country comprising the mainland of the Australian continent, the island of Tasmania, and numerous smaller islands.",
    founded: "1901",
    industry: "Government",
    employees: "25.7 million+",
    revenue: "$1.6 trillion GDP",
    headquarters: "Canberra, Australia",
    details: {
      companies: [
        { name: "BHP" },
        {
          name: "Commonwealth Bank",
        },
        {
          name: "Woolworths",
        },
      ],
    },
  },
  {
    id: "zealand",
    name: "New Zealand 新西兰",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg",
    description:
      "New Zealand is an island country in the southwestern Pacific Ocean. It consists of two main landmasses—the North Island and the South Island—and over 700 smaller islands.",
    founded: "1840",
    industry: "Government",
    employees: "5.1 million+",
    revenue: "$249 billion GDP",
    headquarters: "Wellington, New Zealand",
    details: {
      companies: [
        { name: "Fonterra" },
        {
          name: "Air New Zealand",
        },
        { name: "Spark" },
      ],
    },
  },
  {
    id: "cambodia",
    name: "Cambodia 柬埔寨",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Cambodia.svg",
    description:
      "Cambodia, officially the Kingdom of Cambodia, is a country located in the southern portion of the Indochinese Peninsula in Southeast Asia.",
    founded: "802",
    industry: "Government",
    employees: "16.7 million+",
    revenue: "$27 billion GDP",
    headquarters: "Phnom Penh, Cambodia",
    details: {
      companies: [
        {
          name: "Cambodia Angkor Air",
        },
        {
          name: "ACLEDA Bank",
        },
      ],
    },
  },
  {
    id: "japan",
    name: "Japan 日本",
    logo: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg",
    description:
      "Japan is an island country in East Asia. It is situated in the northwest Pacific Ocean and is bordered on the west by the Sea of Japan.",
    founded: "660 BC",
    industry: "Government",
    employees: "125.8 million+",
    revenue: "$4.9 trillion GDP",
    headquarters: "Tokyo, Japan",
    details: {
      companies: [
        { name: "Toyota" },
        { name: "Sony" },
        { name: "Nintendo" },
        { name: "Honda" },
      ],
    },
  },
];
