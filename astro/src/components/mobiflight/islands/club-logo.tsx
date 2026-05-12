interface ClubLogoProps {
  className?: string
}
const ClubLogo = ({ className }: ClubLogoProps) => {
  return (
    <div className={className}>
      <div className={`flex flex-row items-baseline`}>
        <img
          src="https://shop.mobiflight.com/wp-content/uploads/2026/02/mobiflight-logo-wide-small.png"
          alt="MobiFlight"
          className="h-8"
        />
        <span className="-mb-3 -ml-5 rounded-2xl bg-primary px-1 py-0.5 text-xs text-background normal-case">
          Club
        </span>
      </div>
    </div>
  )
}
export default ClubLogo
