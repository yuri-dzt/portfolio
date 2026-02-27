// "use client";

// import { useEffect, useState } from "react";

// interface TypewriterTextProps {
//   text: string;
// }

// const TypewriterText = ({ text }: TypewriterTextProps) => {
//   const [displayed, setDisplayed] = useState("");
//   const [done, setDone] = useState(false);

//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     let timeout: NodeJS.Timeout;
//     let i = 0;

//     const startTyping = () => {
//       setDone(false);
//       i = 0;

//       interval = setInterval(() => {
//         setDisplayed(text.slice(0, i + 1));
//         i++;

//         if (i >= text.length) {
//           clearInterval(interval);
//           setDone(true);

//           timeout = setTimeout(() => {
//             setDisplayed("");
//             startTyping();
//           }, 5000);
//         }
//       }, 100);
//     };

//     startTyping();

//     return () => {
//       clearInterval(interval);
//       clearTimeout(timeout);
//     };
//   }, [text]);

//   return (
//     <span>
//       {displayed}
//       {!done && (
//         <span className="inline-block w-0.5 h-5 sm:h-6 bg-[#c8ff00] ml-1 animate-pulse align-middle" />
//       )}
//     </span>
//   );
// };

// export { TypewriterText };

"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
}

const TypewriterText = ({ text }: TypewriterTextProps) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
    let i = 0;

    const startTyping = () => {
      setDone(false);
      i = 0;

      interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;

        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);

          timeout = setTimeout(() => {
            setDisplayed("");
            startTyping();
          }, 5000);
        }
      }, 100);
    };

    startTyping();

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text]);

  return (
    <span>
      {displayed}
      <span
        className={`inline-block w-0.5 h-5 sm:h-6 bg-primary ml-1 align-middle ${
          done ? "cursor-blink" : "opacity-100"
        }`}
      />
    </span>
  );
};

export { TypewriterText };
