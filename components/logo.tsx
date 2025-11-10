import Image from "next/image"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/microbiz-logo-removebg-preview.png"
        alt="MicroBiz Logo"
        width={180}
        height={180}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  )
}
