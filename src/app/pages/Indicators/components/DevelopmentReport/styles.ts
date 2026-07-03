import tw from "tailwind-styled-components";

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

export const Header = tw.div`
w-full
text-center
text-black

[&>h2]:text-xl
[&>h2]:font-bold
[&>h2]:text-mbr-blue-10

[&>p]:text-base
[&>p]:font-bold
[&>p]:truncate

md:[&>h2]:text-4xl
md:[&>p]:text-2xl
`;

export const Session = tw.div`
w-full
grid
grid-cols-1
gap-6
items-stretch

lg:grid-cols-2
`;

export const SessionTriple = tw.div`
w-full
grid
grid-cols-1
gap-6
items-stretch

md:grid-cols-2

lg:grid-cols-3
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
