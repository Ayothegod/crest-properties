export const SvgMask = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlnsSvgjs="http://svgjs.dev/svgjs"
    viewBox="0 0 800 400"
    width="100%"
    height="100%"
  >
    <defs>
      <mask id="mask">
        <rect width="100%" height="100%" fill="white" />
        <path
          d="M611.2107543945312,188.34080505371094C574.5470837402344,206.6726446533203,555.3542761230469,265.8654736328125,480.2690734863281,253.81166076660156C405.1838708496094,241.75784790039063,405.5784655761719,145.04035095214843,343.04931640625,145.29147338867188C280.5201672363281,145.54259582519532,281.05830078125,224.07175170898438,256.95068359375,254.70852661132812"
          fill="black"
          stroke="none"
        />
      </mask>
    </defs>
    <rect width="100%" height="100%" fill="black" mask="url(#mask)" />
  </svg>
);
