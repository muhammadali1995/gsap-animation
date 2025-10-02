import type { Country } from "~/models/country";

export const countries: Country[] = [
  {
    id: "china",
    name: "CHINA 中国",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_China.svg",
    description:
      "China, officially the People's Republic of China, is a country in East Asia. It is the world's most populous country with a population exceeding 1.4 billion.",
    founded: "1949",
    industry: "Government",
    employees: "1.4 billion+",
    revenue: "$17.7 trillion GDP",
    headquarters: "Beijing, China",
    details: {
      companies: [
        { name: "Alibaba", logo: "https://logo.clearbit.com/alibaba.com" },
        { name: "Tencent", logo: "https://logo.clearbit.com/tencent.com" },
      ],
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
        { name: "Apple", logo: "https://logo.clearbit.com/apple.com" },
        { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
        { name: "Google", logo: "https://logo.clearbit.com/google.com" },
        { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
        { name: "Meta", logo: "https://logo.clearbit.com/meta.com" },
        { name: "Tesla", logo: "https://logo.clearbit.com/tesla.com" },
        { name: "Netflix", logo: "https://logo.clearbit.com/netflix.com" },
        { name: "Nike", logo: "https://logo.clearbit.com/nike.com" },
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
        { name: "Shopify", logo: "https://logo.clearbit.com/shopify.com" },
        { name: "RBC", logo: "https://logo.clearbit.com/rbc.com" },
        { name: "TD Bank", logo: "https://logo.clearbit.com/td.com" },
        { name: "Lululemon", logo: "https://logo.clearbit.com/lululemon.com" },
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
        { name: "BHP", logo: "https://logo.clearbit.com/bhp.com" },
        {
          name: "Commonwealth Bank",
          logo: "https://logo.clearbit.com/commbank.com.au",
        },
        {
          name: "Woolworths",
          logo: "https://logo.clearbit.com/woolworths.com.au",
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
        { name: "Fonterra", logo: "https://logo.clearbit.com/fonterra.com" },
        {
          name: "Air New Zealand",
          logo: "https://logo.clearbit.com/airnewzealand.co.nz",
        },
        { name: "Spark", logo: "https://logo.clearbit.com/spark.co.nz" },
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
          logo: "https://logo.clearbit.com/angkorair.com",
        },
        {
          name: "ACLEDA Bank",
          logo: "https://logo.clearbit.com/acledabank.com.kh",
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
        { name: "Toyota", logo: "https://logo.clearbit.com/toyota.com" },
        { name: "Sony", logo: "https://logo.clearbit.com/sony.com" },
        { name: "Nintendo", logo: "https://logo.clearbit.com/nintendo.com" },
        { name: "Honda", logo: "https://logo.clearbit.com/honda.com" },
      ],
    },
  },
];
