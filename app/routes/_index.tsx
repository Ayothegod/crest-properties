import type { MetaFunction } from "@remix-run/node";
import { useToast } from "~/components/ui/use-toast";
import { SvgMask } from "~/components/build/SvgMask";
import orgImage from "~/assets/masked-id.jpg";
import mask from "~/assets/masking.png";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { toast } = useToast();
  console.log("Hello");

  const addUser = () => {
    console.log("user created successfully");

    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
    });
  };

  const clickBtn = () => {
    console.log("data");
  };

  return (
    <div className="grid place-items-center min-h-screen">
      <img src={mask} alt="" />

      <div className="">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:svgjs="http://svgjs.dev/svgjs"
          viewBox="0 0 800 400"
        >
          <path
            d="M611.2107543945312,188.34080505371094C574.5470837402344,206.6726446533203,555.3542761230469,265.8654736328125,480.2690734863281,253.81166076660156C405.1838708496094,241.75784790039063,405.5784655761719,145.04035095214843,343.04931640625,145.29147338867188C280.5201672363281,145.54259582519532,281.05830078125,224.07175170898438,256.95068359375,254.70852661132812"
            fill="none"
            stroke-width="93"
            stroke='url("#SvgjsLinearGradient1000")'
            stroke-linecap="round"
          ></path>
          <defs>
            <linearGradient id="SvgjsLinearGradient1000">
              <stop stop-color="hsl(37, 99%, 67%)" offset="0"></stop>
              <stop stop-color="hsl(316, 73%, 52%)" offset="1"></stop>
            </linearGradient>
          </defs>
        </svg> */}
        <div className="border-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            // xmlns:svgjs="http://svgjs.dev/svgjs"
            viewBox="0 0 800 400"
          >
            <path
              d="M614.7981967669418 166.8161385369417C578.1345261126451 185.14797813655107 558.9417184954575 244.34080711604327 483.85651585873876 232.28699424983233C408.77131322202 220.2331813836214 409.1659079485825 123.5156844353792 346.63675877866064 123.76680687190265C284.10760960873876 124.01792930842609 284.64574315366065 202.54708519221515 260.53812596616064 233.1838600945589 "
              fill="none"
              stroke-width="93"
              stroke='url("#SvgjsLinearGradient1000")'
              stroke-linecap="round"
            ></path>
            <defs>
              <linearGradient id="SvgjsLinearGradient1000">
                <stop stop-color="hsl(37, 99%, 67%)" offset="0"></stop>
                <stop stop-color="hsl(316, 73%, 52%)" offset="1"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="border-4">
          <svg viewBox="0 0 800 500">
            <defs>
              <linearGradient id="SvgjsLinearGradient1000">
                <stop stop-color="hsl(37, 99%, 67%)" offset="0"></stop>
                <stop stop-color="hsl(316, 73%, 52%)" offset="1"></stop>
              </linearGradient>
              <mask id="svgmask5">
                <rect x="-10" y="-10" width="900" height="500" fill="#ffffff" />
              </mask>
              <image href={orgImage} mask="url(#svgmask5)" />
            </defs>
            <path
              d="M614.7981967669418 166.8161385369417C578.1345261126451 185.14797813655107 558.9417184954575 244.34080711604327 483.85651585873876 232.28699424983233C408.77131322202 220.2331813836214 409.1659079485825 123.5156844353792 346.63675877866064 123.76680687190265C284.10760960873876 124.01792930842609 284.64574315366065 202.54708519221515 260.53812596616064 233.1838600945589 "
              fill="none"
              stroke-width="93"
              stroke='url("#SvgjsLinearGradient1000")'
              stroke-linecap="round"
              mask="url(#svgmask2)"
            ></path>
          </svg>
        </div>

        {/* <h3>An image with a mask layer image:</h3>
        <div className="mask1">
          <img src={orgImage} alt="Cinque Terre" className="h-60 object-cover" />
        </div>
        <h3>An SVG mask layer (formed as a triangle):</h3> */}

        {/* <svg width="600" height="400">
          <mask id="svgmask1">
            <polygon fill="#ffffff" points="200 0, 400 400, 0 400"></polygon>
          </mask>
          <image href={orgImage} mask="url(#svgmask1)" />
        </svg> */}

        <svg width="600" height="400">
          <mask id="svgmask3">
            <circle fill="#ffffff" cx="75" cy="75" r="75"></circle>
            <circle fill="#ffffff" cx="80" cy="260" r="75"></circle>
            <circle fill="#ffffff" cx="270" cy="160" r="75"></circle>
          </mask>
          <image href={orgImage} mask="url(#svgmask3)"></image>
        </svg>

        <h3>Original image:</h3>

        <img
          src={orgImage}
          alt="Cinque Terre"
          width="600"
          height="400"
          className="border-4 border-red-600 h-48 object-cover"
        />

        <Button
          className="bg-red-500 px-4 py-2 rounded-md"
          disabled
          onClick={clickBtn}
        >
          Hello Kobalte
        </Button>
      </div>

      <p>Create Users</p>
      <button
        onClick={addUser}
        className="border-none text-white px-8 py-2 rounded-md bg-black"
      >
        Create User
      </button>
    </div>
  );
}

// return (
//   <div className="grid place-items-center min-h-screen">
//     <img src={mask} alt="" />
//     <div className="">
//       {/* <svg
//         xmlns="http://www.w3.org/2000/svg"
//         version="1.1"
//         xmlns:xlink="http://www.w3.org/1999/xlink"
//         xmlns:svgjs="http://svgjs.dev/svgjs"
//         viewBox="0 0 800 400"
//       >
//         <path
//           d="M611.2107543945312,188.34080505371094C574.5470837402344,206.6726446533203,555.3542761230469,265.8654736328125,480.2690734863281,253.81166076660156C405.1838708496094,241.75784790039063,405.5784655761719,145.04035095214843,343.04931640625,145.29147338867188C280.5201672363281,145.54259582519532,281.05830078125,224.07175170898438,256.95068359375,254.70852661132812"
//           fill="none"
//           stroke-width="93"
//           stroke='url("#SvgjsLinearGradient1000")'
//           stroke-linecap="round"
//         ></path>
//         <defs>
//           <linearGradient id="SvgjsLinearGradient1000">
//             <stop stop-color="hsl(37, 99%, 67%)" offset="0"></stop>
//             <stop stop-color="hsl(316, 73%, 52%)" offset="1"></stop>
//           </linearGradient>
//         </defs>
//       </svg> */}
//       <div className="border-4">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           version="1.1"
//           // xmlns:svgjs="http://svgjs.dev/svgjs"
//           viewBox="0 0 800 400"
//         >
//           <path
//             d="M614.7981967669418 166.8161385369417C578.1345261126451 185.14797813655107 558.9417184954575 244.34080711604327 483.85651585873876 232.28699424983233C408.77131322202 220.2331813836214 409.1659079485825 123.5156844353792 346.63675877866064 123.76680687190265C284.10760960873876 124.01792930842609 284.64574315366065 202.54708519221515 260.53812596616064 233.1838600945589 "
//             fill="none"
//             stroke-width="93"
//             stroke='url("#SvgjsLinearGradient1000")'
//             stroke-linecap="round"
//           ></path>
//           <defs>
//             <linearGradient id="SvgjsLinearGradient1000">
//               <stop stop-color="hsl(37, 99%, 67%)" offset="0"></stop>
//               <stop stop-color="hsl(316, 73%, 52%)" offset="1"></stop>
//             </linearGradient>
//           </defs>
//         </svg>
//       </div>
//       {/* TODO: error */}
//       <div className="border-4">
//         <svg viewBox="0 0 800 500">
//           <defs>
//             <linearGradient id="SvgjsLinearGradient1000">
//               <stop stop-color="hsl(37, 99%, 67%)" offset="0"></stop>
//               <stop stop-color="hsl(316, 73%, 52%)" offset="1"></stop>
//             </linearGradient>
//             <mask id="svgmask5">
//               <rect x="-10" y="-10" width="900" height="500" fill="#ffffff" />
//             </mask>
//             <image href={orgImage} mask="url(#svgmask5)" />
//           </defs>
//           <path
//             d="M614.7981967669418 166.8161385369417C578.1345261126451 185.14797813655107 558.9417184954575 244.34080711604327 483.85651585873876 232.28699424983233C408.77131322202 220.2331813836214 409.1659079485825 123.5156844353792 346.63675877866064 123.76680687190265C284.10760960873876 124.01792930842609 284.64574315366065 202.54708519221515 260.53812596616064 233.1838600945589 "
//             fill="none"
//             stroke-width="93"
//             stroke='url("#SvgjsLinearGradient1000")'
//             stroke-linecap="round"
//             mask="url(#svgmask2)"
//           ></path>
//         </svg>
//       </div>
//       {/* <h3>An image with a mask layer image:</h3>
//       <div className="mask1">
//         <img src={orgImage} alt="Cinque Terre" className="h-60 object-cover" />
//       </div>
//       <h3>An SVG mask layer (formed as a triangle):</h3> */}
//       <svg width="600" height="400">
//         <mask id="svgmask1">
//           <polygon fill="#ffffff" points="200 0, 400 400, 0 400"></polygon>
//         </mask>
//         <image href={orgImage} mask="url(#svgmask1)" />
//       </svg>
//       <svg width="600" height="400">
//         <mask id="svgmask3">
//           <circle fill="#ffffff" cx="75" cy="75" r="75"></circle>
//           <circle fill="#ffffff" cx="80" cy="260" r="75"></circle>
//           <circle fill="#ffffff" cx="270" cy="160" r="75"></circle>
//         </mask>
//         <image href={orgImage} mask="url(#svgmask3)"></image>
//       </svg>
//       <h3>Original image:</h3>
//       <img
//         src={orgImage}
//         alt="Cinque Terre"
//         width="600"
//         height="400"
//         className="border-4 border-red-600 h-48 object-cover"
//       />
//       <Button
//         className="bg-red-500 px-4 py-2 rounded-md"
//         disabled
//         onClick={clickBtn}
//       >
//         Hello Kobalte
//       </Button>
//     </div>

//     <p>Create Users</p>
//     <button
//       onClick={addUser}
//       className="border-none text-white px-8 py-2 rounded-md bg-black"
//     >
//       Create User
//     </button>
//   </div>
// )

// is it good to have a fixed height for a website header or just let it go using the padding
