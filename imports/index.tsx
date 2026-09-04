import svgPaths from "./svg-7ssjqf29zd"
type ComponentProps = {
  className?: string
  variant?: "1" | "2"
}

function Component({ className, variant = "1" }: ComponentProps) {
  const is2 = variant === "2"
  return (
    <div
      className={
        className ||
        `overflow-clip relative ${is2 ? "size-[16px]" : "size-[32px]"}`
      }
    >
      {variant === "1" && (
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="32"
          preserveAspectRatio="none"
          viewBox="0 0 32 32"
          width="32"
        >
          <path
            clipRule="evenodd"
            d={svgPaths.p3105d500}
            fill="#8585FF"
            fillRule="evenodd"
            id="Vector"
          />
        </svg>
      )}
      {is2 && (
        <div
          className="absolute inset-[12.47%_12.47%_8.33%_8.33%]"
          data-name="Vector"
        >
          <div className="absolute inset-[-5.26%]">
            <svg
              className="block size-full"
              fill="none"
              height="14.0053"
              preserveAspectRatio="none"
              viewBox="0 0 14.0053 14.0053"
              width="14.0053"
            >
              <path
                d={svgPaths.p4eeac00}
                id="Vector"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.33333"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

function DivAbsolute() {
  return (
    <div className="h-[59px] relative shrink-0 w-full" data-name="div.absolute">
      <div
        className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] left-0 text-[16px] text-white top-[12.5px] w-[402.167px]"
        style={{ fontVariationSettings: '"opsz" 14' }}
      >
        <p className="font-['Futura_LT:BookOblique',sans-serif] not-italic">
          <span className="leading-[26px]">{`Ask UDDA `}</span>
          <span className="leading-[26px] text-[rgba(255,255,255,0.8)]">{`I have 12 tactics but executed zero — what's `}</span>
        </p>
      </div>
    </div>
  )
}

function DivRelative() {
  return (
    <div
      className="content-stretch flex flex-col items-start justify-center min-h-[56px] relative shrink-0 w-full"
      data-name="div.relative"
    >
      <DivAbsolute />
    </div>
  )
}

function TalkToUdda() {
  return (
    <div
      className="content-stretch flex flex-col items-center justify-center max-w-[40px] overflow-clip relative shrink-0 size-[32px]"
      data-name="Talk to UDDA"
    >
      <div
        className="overflow-clip relative shrink-0 size-[32px]"
        data-name="Component 1"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="32"
          preserveAspectRatio="none"
          viewBox="0 0 32 32"
          width="32"
        >
          <path
            clipRule="evenodd"
            d={svgPaths.p3105d500}
            fill="white"
            fillRule="evenodd"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  )
}

function StartVoiceConversation() {
  return (
    <div
      className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]"
      data-name="Start voice conversation"
    >
      <TalkToUdda />
    </div>
  )
}

function DivFlex2() {
  return (
    <div
      className="content-stretch flex gap-[2px] h-[12px] items-end relative shrink-0"
      data-name="div.flex"
    >
      <div
        className="bg-[#bdfad0] h-[4px] relative rounded-[9999px] shrink-0 w-[3px]"
        data-name="span.rounded-full"
      />
      <div
        className="bg-[#bdfad0] h-[6.52px] relative rounded-[9999px] shrink-0 w-[3px]"
        data-name="span.rounded-full"
      />
      <div
        className="bg-[#bdfad0] h-[11.08px] relative rounded-[9999px] shrink-0 w-[3px]"
        data-name="span.rounded-full"
      />
      <div
        className="bg-[#bdfad0] h-[6.52px] relative rounded-[9999px] shrink-0 w-[3px]"
        data-name="span.rounded-full"
      />
      <div
        className="bg-[#bdfad0] h-[4px] relative rounded-[9999px] shrink-0 w-[3px]"
        data-name="span.rounded-full"
      />
    </div>
  )
}

function SpanTextXs() {
  return (
    <div
      className="content-stretch flex flex-col items-center relative shrink-0"
      data-name="span.text-xs"
    >
      <div className="[word-break:break-word] flex flex-col font-['Futura_LT:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">
        <p className="leading-[16px]">Tap the mic and say the word</p>
      </div>
    </div>
  )
}

function DivFlex1() {
  return (
    <div
      className="content-stretch flex gap-[12px] items-center relative shrink-0"
      data-name="div.flex"
    >
      <StartVoiceConversation />
      <DivFlex2 />
      <SpanTextXs />
    </div>
  )
}

function Span() {
  return (
    <div
      className="content-stretch flex flex-col items-center relative shrink-0"
      data-name="span"
    >
      <div className="[word-break:break-word] flex flex-col font-['Futura_LT:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
        <p className="leading-[20px]">Talk</p>
      </div>
    </div>
  )
}

function DivFlex() {
  return (
    <div
      className="border-[rgba(216,211,202,0.5)] border-solid border-t content-stretch flex items-center justify-between pt-[12px] relative shrink-0 w-full"
      data-name="div.flex"
    >
      <DivFlex1 />
      <div
        className="relative rounded-[9999px] shrink-0"
        data-name="Component 2"
      >
        <div
          aria-hidden
          className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[9999px]"
        />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative size-full">
            <Component
              className="overflow-clip relative shrink-0 size-[16px]"
              variant="2"
            />
            <Span />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DivBgCard() {
  return (
    <div
      className="bg-[#075f63] border border-[#d8d3ca] border-solid content-stretch flex flex-col gap-[12px] items-start p-[20px] relative rounded-[16px] size-full"
      data-name="div.bg-card"
    >
      <div
        className="absolute bg-[rgba(255,255,255,0)] inset-[-1px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
        data-name="div.bg-card:shadow"
      />
      <DivRelative />
      <DivFlex />
    </div>
  )
}
