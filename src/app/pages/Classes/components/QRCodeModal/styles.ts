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
max-w-[420px]
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

export const ClassName = tw.p`
text-black
text-base
font-semibold
text-center
`;

export const QrBox = tw.div`
w-full
flex
flex-col
items-center
justify-center
gap-3
py-2
`;

export const QrFrame = tw.div`
p-3
rounded-2xl
border
border-mbr-gray-20
bg-white
`;

export const Code = tw.p`
text-mbr-blue-10
text-lg
font-bold
tracking-wide
`;

export const DownloadButton = tw.button`
w-full
px-4
py-3
rounded-lg
bg-mbr-blue-10
text-white
text-sm
font-semibold
flex
items-center
justify-center
gap-2
cursor-pointer

hover:opacity-90

md:text-base

[&>svg]:text-base
`;
