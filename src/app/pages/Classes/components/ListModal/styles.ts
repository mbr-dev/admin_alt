import tw from "tailwind-styled-components";

export const Overlay = tw.div`
fixed
inset-0
z-[999]
bg-black/50
flex
items-center
justify-center
p-4
`;

export const Card = tw.div`
w-full
max-w-[520px]
max-h-[80vh]
bg-white
rounded-2xl
border
border-mbr-gray-30
p-5
flex
flex-col
gap-4
`;

export const Header = tw.div`
w-full
flex
items-center
justify-between
gap-3
`;

export const Title = tw.h3`
text-mbr-blue-10
text-lg
font-bold

md:text-xl
`;

export const CloseButton = tw.button`
w-8
h-8
rounded-lg
flex
items-center
justify-center
cursor-pointer

hover:bg-mbr-gray-20

[&>svg]:text-xl
[&>svg]:text-mbr-blue-10
`;

export const List = tw.ul`
w-full
overflow-y-auto
flex
flex-col
gap-2
`;

export const ListItem = tw.li`
w-full
rounded-xl
border
border-mbr-gray-30
bg-mbr-gray-10
p-3
flex
flex-col
gap-1
`;

export const ItemName = tw.p`
text-black
text-sm
font-semibold

md:text-base
`;

export const ItemDescription = tw.p`
text-mbr-gray-80
text-xs

md:text-sm
`;

export const Empty = tw.p`
text-mbr-gray-80
text-sm
text-center
py-6
`;

export const SkeletonList = tw.div`
w-full
flex
flex-col
gap-2
animate-pulse
`;

export const SkeletonItem = tw.div`
w-full
h-14
rounded-xl
bg-mbr-gray-20
`;
