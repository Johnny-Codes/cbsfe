import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";

const cardData = [
  {
    id: "1",
    name: "Basic Tier",
    cost: "50",
    items: [
      "Guaranteed Graded Coin (PCGS, NGC, CACG, ANACS)",
      "90% Silver",
      "U.S. Cions",
      "Foreign Coins",
      "...and More!",
    ],
    purchaseLink: "https://buy.stripe.com/cN2g2B1iq0Bi6QMfZ0",
  },
  {
    id: "2",
    name: "Premium Tier",
    cost: "100",
    items: ["Guaranteed 1oz 999 Fine Silver", "Everything in Basic Tier"],
    purchaseLink: "https://buy.stripe.com/14k8A94uC3Nudfa4gh",
  },
  {
    id: "3",
    name: "Deluxe Tier",
    cost: "200",
    items: [
      "Guaranteed Uncirculated Silver Dollar",
      "Everything in Premium Tier",
    ],
    purchaseLink: "https://buy.stripe.com/4gw5nXd186ZGb72aEH",
  },
];

const SubscriptionCard = () => {
  // const comp = useRef(null)
  // const [isVisible, setIsVisible] = useState(false);
  // const [triggered, setTriggered] = useState(false);

  // useEffect(() => {
  //     const observer = new IntersectionObserver(
  //       ([entry]) => {
  //         setIsVisible(entry.isIntersecting);
  //       },
  //       {
  //         root: null,
  //         rootMargin: '0px',
  //         threshold: 0.1
  //       }
  //     );

  //     if (comp.current) {
  //       observer.observe(comp.current);
  //     }

  //     return () => {
  //       if (comp.current) {
  //         observer.unobserve(comp.current);
  //       }
  //     };
  //   }, []);

  //   useLayoutEffect(() => {
  //     if (isVisible && triggered === false) {
  //       setTriggered(true);
  //       let ctx = gsap.context(() => {
  //         const t1 = gsap.timeline();
  //         t1.from("#card-1", {
  //         //   xPercent: "-50",
  //           opacity: 0,
  //           duration: 0.8,
  //           delay: 0.3,
  //         })
  //           .from("#card-2", {
  //             // xPercent: "50",
  //             opacity: 0,
  //             duration: 0.8,
  //             delay: 0.3,
  //           })
  //           .from("#card-3", {
  //             // xPercent: "-50",
  //             opacity: 0,
  //             duration: 0.8,
  //             delay: 0.3,
  //           })
  //           .from("#manage-subscription", {
  //             opacity: 0,
  //             duration: 1.3,
  //             delay: 0.3,
  //           });
  //       }, comp);

  //       return () => {
  //         ctx.kill();
  //       };
  //     }
  //   }, [isVisible]);

  return (
    <>
      <div className="flex flex-wrap justify-between mt-10">
        {cardData.map((data) => (
          <div
            id={`card-${data.id}`}
            className="my-4 w-full max-w-sm p-4 bg-gray-50 border border-gray-200 rounded-lg shadow shadow-white sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between"
          >
            <div>
              <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                {data.name}
              </h5>
              <div className="flex items-baseline text-gray-900 dark:text-white">
                <span className="text-3xl font-semibold">$</span>
                <span className="text-5xl font-extrabold tracking-tight">
                  {data.cost}
                </span>
                <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                  /month
                </span>
              </div>
              <ul role="list" className="space-y-5 my-7">
                {data.items.map((item) => (
                  <li className="flex items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={data.purchaseLink}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
            >
              Subscribe Now!
            </a>
          </div>
        ))}
        
      </div>
      <div id="manage-subscription" className="flex justify-center mt-10">
          <a
            href="https://billing.stripe.com/p/login/3cscPK5dT3jw8AofYY"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center text-center"
          >
            Already Subscribed? Manage your Subscription
          </a>
        </div>
    </>
  );
};

export default SubscriptionCard;
