import tw from "tailwind-styled-components";

export const Card = tw.div<{ $exporting?: boolean }>`
w-full
flex
flex-col
rounded-xl
shadow-xl
bg-white
border
border-mbr-gray-20
${(p) =>
  p.$exporting
    ? `
h-auto
overflow-visible
`
    : `
h-full
overflow-hidden
`}
`;

export const TitleBar = tw.div<{ $variant: "strong" | "weak" }>`
w-full
px-4
py-3
text-center
text-base
font-bold
uppercase
${(p) => (p.$variant === "strong" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700")}

md:text-lg
`;

export const Body = tw.div`
flex
flex-1
flex-col
gap-4
p-4

md:p-5
`;

export const Item = tw.div`
flex
flex-col
gap-1
`;

export const Category = tw.span<{ $exporting?: boolean }>`
text-xs
uppercase
text-mbr-gray-50
${(p) =>
  p.$exporting
    ? `
whitespace-normal
break-words
`
    : `
truncate
`}
`;

export const Skill = tw.span<{ $exporting?: boolean }>`
text-sm
font-semibold
text-mbr-gray-30

md:text-base

${(p) =>
  p.$exporting
    ? `
whitespace-normal
break-words
`
    : `
truncate
`}
`;

export const Empty = tw.div`
w-full
flex
flex-1
items-center
justify-center
py-10

[&>p]:font-bold
[&>p]:text-mbr-blue-10
[&>p]:text-base
`;
