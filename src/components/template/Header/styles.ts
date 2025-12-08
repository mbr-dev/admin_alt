import tw from "tailwind-styled-components";

export const Container = tw.header`
w-hull
py-3
flex
items-center
justify-center
relative
bg-mbr-red-10
shadow-lg

landscape:py-2

md:py-4

landscape:lg:py-4
`;

export const Header = tw.div`
w-full
flex
justify-between
px-4

md:px-8
`;

export const Menu = tw.div`
flex
items-center
justify-center

[&>p]:hidden

landscape:[&>p]:flex
landscape:[&>p]:text-white
landscape:[&>p]:text-xl
landscape:[&>p]:font-bold
landscape:gap-2

md:[&>p]:flex
md:[&>p]:text-white
md:[&>p]:text-3xl
md:[&>p]:font-bold
md:gap-2

landscape:lg:[&>p]:flex
landscape:lg:[&>p]:text-white
landscape:lg:[&>p]:text-3xl
landscape:lg:[&>p]:font-bold
landscape:lg:gap-2
`;

export const Button = tw.div`
w-[44px]
h-[44px]
flex
items-center
justify-center
cursor-pointer

[&>svg]:text-[44px]
[&>svg]:text-white

md:w-[64px]
md:h-[64px]
md:[&>svg]:text-[58px]

landscape:lg:w-[64px]
landscape:lg:h-[64px]
landscape:lg:[&>svg]:text-[58px]
`;

export const Infos = tw.div`
flex
items-center
gap-4

md:gap-8

landscape:lg:gap-8
`;

export const Avatar = tw.button`
w-[44px]
h-[44px]
border-2
border-mbr-red-20
bg-white
rounded-full
cursor-pointer

[&>img]:w-full
[&>img]:h-full
[&>img]:object-contain

md:w-[64px]
md:h-[64px]

landscape:lg:w-[64px]
landscape:lg:h-[64px]
`;

export const ButtonExit = tw.div`
w-[32px]
h-[32px]
flex
items-center
justify-center
cursor-pointer

[&>svg]:text-[32px]
[&>svg]:text-white

md:w-[48px]
md:h-[48px]
md:[&>svg]:text-[48px]

landscape:lg:w-[48px]
landscape:lg:h-[48px]
landscape:lg:[&>svg]:text-[48px]
`;