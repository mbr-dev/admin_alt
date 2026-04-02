import tw from "tailwind-styled-components";

export const Container = tw.div`
flex-1
w-full
h-full
flex
flex-col
bg-mbr-gray-20
p-4
pb-24
relative
gap-4

md:p-8
md:pb-24
md:gap-6

landscape:lg:p-8
landscape:lg:pb-24
`;

export const Main = tw.div`
w-full
h-full
flex
flex-col
gap-4
z-30

md:gap-6
`;

export const ContentArea = tw.div`
w-full
flex
flex-col
gap-4
`;

export const Title = tw.h1`
text-lg
font-semibold
text-mbr-gray-30

md:text-xl
`;

export const LoadingBox = tw.div`
w-full
rounded-2xl
border
border-mbr-gray-30
bg-white
p-8
text-center
text-sm
text-mbr-gray-50
animate-pulse
`;
