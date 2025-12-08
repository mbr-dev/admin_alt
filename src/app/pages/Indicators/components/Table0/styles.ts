import tw from "tailwind-styled-components";
import { Table } from "@/components/ui";

export const Head = tw(Table.TableHead)`
text-mbr-blue-10
font-bold text-base
border-r-2
border-b-2

md:text-lg

landscape:lg:text-lg
`;

export const HeadDiv = tw.div`
flex
items-center
gap-1

md:gap-2

landscape:lg:gap-2
`;

export const ButtonFilter = tw.div`
flex
flex-col
`;

export const Button = tw.button`
w-[16px]
h-[16px]
flex
items-center
justify-center
cursor-pointer

disabled:cursor-not-allowed

[&>svg]:text-lg
[&>svg]:text-mbr-blue-10

md:w-[16px]
md:h-[16px]
md:[&>svg]:text-2xl

landscape:lg:w-[16px]
landscape:lg:h-[16px]
landscape:lg:[&>svg]:text-2xl
`;

export const Cell = tw(Table.TableCell)`
text-black
text-sm
font-medium
border-r-2
border-b-2

[&>img]:w-[36px]
[&>img]:object-contain

[&>svg]:text-xl

md:text-base
md:[&>svg]:text-2xl
md:[&>img]:w-[44px]

landscape:lg:text-base
landscape:lg:[&>svg]:text-2xl
landscape:lg:[&>img]:w-[44px]
`;