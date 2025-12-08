import tw from "tailwind-styled-components";
import { Table } from "@/components/ui";

export const Container = tw.div`
w-[300px]
flex
flex-col
items-center
justify-center
gap-2
py-2
px-4
z-50
rounded-xl
shadow-xl
bg-white

[&>h2]:text-lg
[&>h2]:font-bold

landscape:w-[480px]

md:gap-8
md:[&>h2]:text-2xl
md:w-[600px]

landscape:lg:gap-8
landscape:lg:[&>h2]:text-2xl
landscape:lg:w-[800px]

landscape:xl:w-[944px]
`;

export const Main = tw.div`
w-full
flex
items-center
justify-center
`;

export const Head = tw(Table.TableHead)`
text-base
font-bold
text-black

md:text-lg

landscape:lg:text-lg
`;

export const Cell = tw(Table.TableCell)`
text-sm
font-semibold
text-mbr-gray-30

md:text-base

landscape:lg:text-base
`;

export const Status = tw.p<{ $status: string }>`
w-[100px]
h-[24px]
flex
items-center
justify-center
text-sm
font-semibold
text-mbr-gray-30
text-center
rounded-md

${({ $status }) =>
  $status === "growth" ? "bg-mbr-green-60" :
  $status === "fall" ? "bg-mbr-red-60" : "bg-mbr-yellow-50"}

md:w-[120px]
md:text-base

landscape:lg:w-[120px]
landscape:lg:text-base
`;