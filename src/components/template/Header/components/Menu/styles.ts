import tw from "tailwind-styled-components";

export const Container = tw.div`
w-[200px]
h-dvh
flex
flex-col
pl-4
py-10
absolute
z-[1000]
left-0
top-[64px]
bg-mbr-red-10

landscape:pl-8
landscape:w-[400px]
landscape:top-[60px]

md:top-[96px]
md:w-[400px]
md:pl-8

landscape:lg:top-[96px]
landscape:lg:pl-8
`;

export const Main = tw.nav`
w-full
flex
items-center
`;

export const Item = tw.li`
w-full
flex
flex-col
items-center
cursor-pointer
rounded-bl-md
rounded-tl-md
`;

export const ItemText = tw.div`
w-full
flex
items-center
text-white
px-2
py-2
gap-2

hover:bg-mbr-red-20

[&>p]:flex-1
[&>p]:text-xl
[&>p]:font-bold
[&>p]:truncate

[&>svg]:text-2xl

[&>img]:w-[24px]
[&>img]:h-[24px]

landscape:[&>svg]:text-2xl

md:[&>p]:text-2xl
md:[&>svg]:text-2xl
md:[&>img]:w-[36px]
md:[&>img]:h-[36px]
md:gap-4

landscape:lg:[&>p]:text-2xl
landscape:lg:[&>svg]:text-2xl
landscape:lg:[&>img]:w-[36px]
landscape:lg:[&>img]:h-[36px]
landscape:lg:rounded-lg
landscape:lg:gap-4
`;

export const Dropdown = tw.div`
w-full
flex
flex-col
rounded-bl-md
rounded-tl-md
bg-mbr-red-40
`;

export const DropdownItem = tw.div`
text-white
px-2
py-2

hover:underline
hover:text-mbr-red-20

[&>p]:pl-4
[&>p]:flex-1
[&>p]:truncate
[&>p]:text-xl
[&>p]:font-bold

landscape:[&>p]:pl-8

md:[&>p]:text-2xl
md:[&>p]:pl-[54px]
md:gap-4

landscape:lg:[&>p]:text-2xl
landscape:lg:[&>p]:pl-[54px]
landscape:lg:gap-4
landscape:lg:rounded-lg
`;