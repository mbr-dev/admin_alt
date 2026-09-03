import tw from "tailwind-styled-components";
import { Table } from "@/components/ui";

export const Container = tw.div`
w-full
flex
flex-col
gap-4
z-50

md:flex-row
md:items-stretch
md:gap-4
`;

export const Card = tw.section`
w-full
flex
flex-col
gap-3
bg-white
border
border-mbr-gray-40
rounded-xl
p-4
shadow-sm

md:flex-1
md:p-5
`;

export const CardHeader = tw.div`
flex
items-center
gap-2
`;

export const FunnelHeader = tw.div`
flex
flex-col
gap-1
`;

export const CardTitle = tw.h3`
text-base
font-bold
text-mbr-blue-10

md:text-lg
`;

export const FunnelSubtitle = tw.p`
text-sm
font-medium
text-mbr-blue-10
leading-snug

md:text-base
`;

export const FunnelSubtitleSecondary = tw.p`
text-xs
text-mbr-gray-50
leading-snug

md:text-[13px]
`;

export const FunnelAnalyzed = tw.p`
text-xs
font-semibold
text-mbr-gray-30
mt-1

md:text-sm
`;

export const ChartWrapper = tw.div`
w-full
h-[300px]
overflow-visible

md:h-[340px]
`;

export const FunnelBody = tw.div`
w-full
flex
flex-col
gap-2
py-2
mt-auto
`;

export const FunnelRow = tw.div`
w-full
flex
items-center
gap-2
`;

export const FunnelSegmentWrap = tw.div`
flex-1
flex
items-center
justify-center
min-w-0
`;

export const FunnelSegment = tw.button<{ $selected: boolean }>`
relative
flex
items-center
justify-center
p-0
border-0
bg-transparent
appearance-none
cursor-pointer
rounded-md
transition-opacity
hover:opacity-90
focus-visible:outline
focus-visible:outline-2
focus-visible:outline-offset-2
focus-visible:outline-mbr-blue-10

${({ $selected }) => ($selected ? "ring-2 ring-offset-2 ring-mbr-blue-10" : "")}
`;

export const FunnelImage = tw.img`
w-full
h-auto
select-none
pointer-events-none
`;

export const FunnelOverlay = tw.div`
absolute
inset-0
flex
flex-col
items-center
justify-center
text-center
text-white
px-2
pointer-events-none
`;

export const FunnelValue = tw.span`
text-lg
font-bold
leading-none

md:text-2xl
`;

export const FunnelLabel = tw.span`
text-[10px]
leading-tight
mt-0.5

md:text-xs
`;

export const DiffBlock = tw.div`
w-[88px]
shrink-0
flex
flex-col
items-start
justify-center
`;

export const DiffValue = tw.span`
flex
items-center
gap-1
text-sm
font-bold
`;

export const DiffLabel = tw.span`
text-[10px]
text-mbr-gray-50
leading-tight
`;

export const Skeleton = tw.div`
w-full
h-[360px]
rounded-xl
bg-mbr-gray-40
animate-pulse

md:flex-1
`;

export const ModalRoot = tw.div`
fixed
inset-0
z-[80]
flex
items-center
justify-center
p-4
`;

export const ModalBackdrop = tw.button`
absolute
inset-0
border-0
bg-black/50
cursor-default
`;

export const ModalPanel = tw.div`
relative
z-10
w-full
max-w-5xl
max-h-[85vh]
flex
flex-col
gap-4
bg-white
border
border-mbr-gray-40
rounded-xl
p-4
shadow-lg
overflow-hidden

md:p-6
`;

export const ModalHeader = tw.div`
flex
items-start
justify-between
gap-4
`;

export const ModalTitle = tw.h2`
text-base
font-bold
text-mbr-blue-10
pr-8

md:text-lg
`;

export const ModalClose = tw.button`
absolute
top-3
right-3
flex
items-center
justify-center
border-0
bg-transparent
text-mbr-gray-50
cursor-pointer

[&>svg]:text-2xl

md:top-4
md:right-4
md:[&>svg]:text-3xl
`;

export const ModalBody = tw.div`
w-full
flex
flex-col
gap-4
min-h-0
overflow-auto
`;

export const ModalEmpty = tw.p`
text-sm
text-mbr-gray-50
text-center
py-8
`;

export const ModalSkeleton = tw.div`
w-full
h-[240px]
rounded-xl
bg-mbr-gray-40
animate-pulse
`;

export const Head = tw(Table.TableHead)`
text-sm
font-bold
text-black
text-center
whitespace-nowrap

md:text-base
`;

export const Cell = tw(Table.TableCell)`
text-sm
font-semibold
text-mbr-gray-30
text-center
whitespace-nowrap

md:text-base
`;

export const Variation = tw.span<{ $tone: "positive" | "negative" | "neutral" }>`
font-semibold

${({ $tone }) =>
  $tone === "positive"
    ? "text-green-600"
    : $tone === "negative"
      ? "text-red-500"
      : "text-mbr-gray-50"}
`;
