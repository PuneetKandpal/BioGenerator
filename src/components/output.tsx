"use client";

import React, { useContext } from "react";

import { BorderBeam } from "./magicui/border-beam";
import { BioContext } from "@/context/bio-context";
import CopyLabel from "./copy-label";
import { Skeleton } from "@nextui-org/skeleton";
import { Card } from "@nextui-org/card";
import { motion } from "framer-motion";

function Output() {
  const { loading, output } = useContext(BioContext);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 , delay: 0.2 }}
      exit={{ opacity: 0 }}
      className="min-h-[50vh]"
    >
      <Card className="relative flex  h-full flex-col rounded-xl bg-muted/50 backdrop-blur-sm overflow-hidden border shadow-md ">
        {loading && (
          <BorderBeam
            size={1200}
            borderWidth={1.5}
            duration={4}
            className="z-10"
          />
        )}
        <legend className="flex justify-end">
          <span className="fixed top-3 right-3 rounded-full text-gray-700 border border-gray-400 px-2 bg-gray-100 text-sm ">
            Output
          </span>
        </legend>
        {loading ? (
          <ul className="flex flex-col items-start justify-start space-y-8 sm:space-y-12 p-8 pt-12 xs:p-12 sm:p-16">
            {[1, 2, 3, 4].map((item, index) => (
              <li
                key={index}
                className="w-full text-sm sm:text-base  border border-primary/20 rounded-md p-0 relative bg-background"
              >
                <Skeleton className="rounded-lg transition-all duration-1000">
                  <div className="h-32 w-full  rounded-lg bg-default-300"></div>
                </Skeleton>
                <span className="absolute top-[98%] right-0">
                  <CopyLabel text={item.toString()} />
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="flex flex-col items-start justify-start space-y-8 sm:space-y-12 p-8 pt-12 xs:p-12 sm:p-16">
            {output.map((item, index) => (
              <li
                key={index}
                className="w-full text-base border border-primary/20 rounded-md p-4 relative bg-background"
              >
                {item.bio}
                <span className="absolute top-[98%] right-0">
                  <CopyLabel text={item.bio} />
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </motion.div>
  );
}

export default Output;
