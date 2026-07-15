import tw from "tailwind-styled-components";

export const Card = tw.section`
w-full
flex
flex-col
items-center
gap-2
p-6
rounded-xl
shadow-xl
bg-white
border
border-mbr-gray-20

md:p-8
`;

export const Title = tw.h3`
text-lg
font-bold
text-center
uppercase
text-mbr-blue-10

md:text-2xl
`;

export const Subtitle = tw.p`
w-full
text-sm
text-center
leading-relaxed
text-mbr-gray-30

md:text-base
`;

export const ScrollRow = tw.div<{ $exporting?: boolean }>`
w-full
mt-4
flex
gap-4
${(p) =>
  p.$exporting
    ? `
flex-col
overflow-visible
`
    : `
flex-row
items-stretch
overflow-x-auto
overflow-y-hidden
pb-2
snap-x
snap-mandatory
`}
`;

export const ActivityCard = tw.article<{ $exporting?: boolean }>`
flex
flex-col
items-stretch
gap-4
p-5
rounded-xl
shadow-md
min-h-[200px]
${(p) =>
  p.$exporting
    ? `
w-full
`
    : `
w-[300px]
min-w-[300px]
shrink-0
snap-start

md:w-[320px]
md:min-w-[320px]
`}
`;

export const HeaderRow = tw.div`
w-full
flex
flex-row
items-center
gap-3
`;

export const IconWrap = tw.div`
shrink-0
flex
items-center
justify-center

[&>img]:w-12
[&>img]:h-12
[&>img]:object-contain

md:[&>img]:w-14
md:[&>img]:h-14
`;

export const HeaderText = tw.div`
min-w-0
flex
flex-1
flex-col
gap-1
items-start
text-left
`;

export const ActivityTitle = tw.h4`
w-full
text-base
font-bold
uppercase
text-left
text-white
leading-snug

md:text-lg
`;

export const ActivitySubtitle = tw.p`
w-full
text-sm
font-medium
text-left
text-white/90
leading-relaxed

md:text-base
`;

export const TagsList = tw.ul`
w-full
flex
flex-col
items-start
gap-1
mt-auto
`;

export const TagItem = tw.li`
flex
items-center
justify-start
gap-1.5
text-xs
font-medium
text-left
text-white/95
leading-snug

md:text-sm

before:content-['•']
before:shrink-0
before:text-sm
before:leading-none
`;

export const Empty = tw.div`
w-full
flex
items-center
justify-center
py-10

[&>p]:font-bold
[&>p]:text-mbr-blue-10
[&>p]:text-base

md:[&>p]:text-lg
`;
