import tw from "tailwind-styled-components";
import { FaSpinner } from "react-icons/fa6";

export const Container = tw.div`
w-full
flex
flex-col
gap-6
p-4
pt-10
pb-10
relative
bg-gradient-to-b
from-white
to-mbr-gray-40

md:p-8
md:pt-12
md:pb-15
`;

export const ExportArea = tw.div<{ $exporting?: boolean }>`
w-full
flex
flex-col
gap-6
bg-white
${(p) => (p.$exporting ? "p-4 md:p-6 overflow-hidden" : "")}
`;

export const ButtonBack = tw.div`
flex
items-center
gap-1
absolute
top-1
left-1
font-bold
cursor-pointer

[&>svg]:text-base

md:top-4
md:left-4
md:text-lg
md:[&>svg]:text-xl
`;

export const Header = tw.div<{ $exporting?: boolean }>`
w-full
flex
flex-col
items-center
text-black

md:[&>p]:text-2xl

${(p) =>
  p.$exporting
    ? `
px-6
py-4
pb-8
`
    : ""}
`;

export const TitleRow = tw.div`
flex
items-center
justify-center
gap-3
w-full
max-w-full
`;

export const HeaderTitle = tw.h2`
text-xl
font-bold
text-center
text-mbr-blue-10

md:text-4xl
`;

export const StudentName = tw.p<{ $exporting?: boolean }>`
w-full
text-base
font-bold
text-center

md:text-2xl

${(p) =>
  p.$exporting
    ? `
mt-4
whitespace-normal
break-words
leading-relaxed
px-6
`
    : `
truncate
`}
`;

export const DownloadButton = tw.button<{ $exporting?: boolean }>`
group
inline-flex
h-10
w-10
shrink-0
items-center
justify-center
overflow-hidden
rounded-xl
border
border-mbr-blue-10
bg-mbr-blue-10
text-white
transition-all
duration-300
ease-out
hover:w-auto
hover:gap-2
hover:px-4
focus-visible:w-auto
focus-visible:gap-2
focus-visible:px-4
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-mbr-blue-10
focus-visible:ring-offset-2
disabled:cursor-not-allowed
disabled:opacity-60

[&>svg]:shrink-0
[&>svg]:text-base

md:h-11
md:w-11
md:[&>svg]:text-lg
md:hover:px-5
md:focus-visible:px-5

${(p) => (p.$exporting ? "w-auto gap-2 px-4 md:px-5" : "")}
`;

export const DownloadLabel = tw.span<{ $exporting?: boolean }>`
overflow-hidden
whitespace-nowrap
text-sm
font-bold
transition-all
duration-300
ease-out

md:text-base

${(p) =>
  p.$exporting
    ? "max-w-[12rem] opacity-100"
    : `
max-w-0
opacity-0
group-hover:max-w-[11rem]
group-hover:opacity-100
group-focus-visible:max-w-[11rem]
group-focus-visible:opacity-100
`}
`;

export const DownloadSpinner = tw(FaSpinner)`
animate-spin
text-base

md:text-lg
`;

export const ReportContent = tw.div`
w-full
flex
flex-col
gap-6
`;

export const ExportSection = tw.div`
w-full
`;

export const Session = tw.div<{ $exporting?: boolean }>`
w-full
gap-6
items-stretch
${(p) =>
  p.$exporting
    ? `
flex
flex-col
`
    : `
grid
grid-cols-1

lg:grid-cols-2
`}
`;

export const SessionTriple = tw.div<{ $exporting?: boolean }>`
w-full
gap-6
items-stretch
${(p) =>
  p.$exporting
    ? `
flex
flex-col
`
    : `
grid
grid-cols-1

md:grid-cols-2

lg:grid-cols-3
`}
`;

export const Empty = tw.div`
w-full
flex
items-center
justify-center
py-16

[&>p]:font-bold
[&>p]:text-lg
[&>p]:text-mbr-blue-10

md:[&>p]:text-2xl
`;

export const SkeletonCard = tw.div`
w-full
h-[420px]
rounded-xl
shadow-xl
bg-mbr-gray-40
animate-pulse
`;

export const SkeletonTable = tw.div`
w-full
h-[320px]
rounded-xl
shadow-xl
bg-mbr-gray-40
animate-pulse
`;
