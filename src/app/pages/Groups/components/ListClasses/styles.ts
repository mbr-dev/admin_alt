import tw from "tailwind-styled-components";
import { Table } from "@/components/ui";

export const Container = tw.div`
w-full
h-[450px]
flex
flex-col
items-center
z-30
bg-white
rounded-xl

landscape:h-[224px]

md:h-[700px]

landscape:lg:w-[900px]
landscape:lg:h-[500px]

landscape:xl:w-[1000px]
`;

export const TableContainer = tw(Table.Table)``;

export const TableHeader = tw(Table.TableHeader)``;

export const TableHRow = tw(Table.TableRow)`
[&>th]:font-bold
[&>th]:min-w-[74px]
lg:[&>th]:text-base
[&>th]:text-mbr-red-20
[&>th]:border-r
[&>th]:border-[#E6EFF5]
[&>th:last-of-type]:border-r-0
`;

export const TableHead = tw(Table.TableHead)``;

export const TableBody = tw(Table.TableBody)``;

export const TableBRow = tw(Table.TableRow)`
[&>td]:py-3
lg:[&>td]:text-base
[&>td]:font-bold
[&>td]:border-r
[&>td]:border-[#E6EFF5]
[&>td:last-of-type]:border-r-0
`;

export const TableCell = tw(Table.TableCell)``;

export const ProgressBar = tw.div`
w-full
h-full
rounded-md
bg-[#F0F0F0]
relative
`;

export const Div = tw.div`
w-[64px]
flex
gap-4
items-center
justify-center

landscape:w-full
`;

export const Button = tw.button`
w-[1.75rem]
h-[1.75rem]
flex
items-center
justify-center
bg-mbr-red-10
rounded-lg

[&>svg]:text-white
[&>svg]:text-base

hover:bg-mbr-red-20

md:w-[2rem]
md:h-[2rem]

landscape:md2:w-[2rem]
landscape:md2:h-[2rem]
landscape:md2:rounded-lg
landscape:md2:[&>svg]:text-xl

landscape:lg:w-[2rem]
landscape:lg:h-[2rem]
landscape:lg:rounded-lg
landscape:lg:[&>svg]:text-xl
`;