"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Card, CardContent } from "@/shared/components/ui/Card";
import {
  AuthSteps,
  CurrentAuthStep,
} from "@/features/auth/components/AuthStepManager";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * Animation timing constants
 */
const ANIMATION = {
  DURATION_MS: 300,
} as const;

/**
 * Form height configuration for smooth transitions
 */
const FORM_HEIGHT = {
  [AuthSteps.LOGIN]: "520px",
  [AuthSteps.REGISTER]: "520px",
  [AuthSteps.FORGOT_PASSWORD]: "520px",
  [AuthSteps.VERIFICATION]: "520px",
  [AuthSteps.NEW_PASSWORD]: "520px",
  [AuthSteps.SUCCESS]: "520px",
} as const;

/**
 * Map pathname to auth step
 */
const pathnameToStep: Record<string, AuthSteps> = {
  "/auth/login": AuthSteps.LOGIN,
  "/auth/register": AuthSteps.REGISTER,
  "/auth/forgot-password": AuthSteps.FORGOT_PASSWORD,
  "/auth/verification": AuthSteps.VERIFICATION,
  "/auth/new-password": AuthSteps.NEW_PASSWORD,
  "/auth/success": AuthSteps.SUCCESS,
};

export default function AuthLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<AuthSteps>(AuthSteps.LOGIN);
  const [direction, setDirection] = useState<"left" | "right">("left");

  // Initialize step based on pathname
  useEffect(() => {
    const step = pathnameToStep[pathname];
    if (step) {
      // Determine direction based on step sequence
      const stepSequence = Object.values(AuthSteps);
      const currentIndex = stepSequence.indexOf(activeStep);
      const newIndex = stepSequence.indexOf(step);

      if (currentIndex !== newIndex) {
        setDirection(newIndex > currentIndex ? "left" : "right");
        setActiveStep(step);
      }
    }
  }, [pathname, activeStep]);

  const goToStep = (step: AuthSteps) => {
    // Determine direction based on step sequence
    const stepSequence = Object.values(AuthSteps);
    const currentIndex = stepSequence.indexOf(activeStep);
    const newIndex = stepSequence.indexOf(step);

    setDirection(newIndex > currentIndex ? "left" : "right");
    setActiveStep(step);

    // Find the pathname that corresponds to the step
    const newPathname = Object.entries(pathnameToStep).find(
      ([, value]) => value === step
    )?.[0];

    // Navigate to the new pathname if found
    if (newPathname && newPathname !== pathname) {
      router.push(newPathname);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background image with shadow overlay */}
      <div className="absolute inset-0">
        <Image
          src="/auth-bg-image.jpg"
          className="absolute inset-0"
          alt="Logo"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        {/* Dark overlay for shadow effect */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content container */}
      <div className="w-full h-screen flex flex-col md:flex-row relative z-10">
        {/* Left side - Borali logo and text */}
        <div className="w-full md:w-1/2 text-white p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <Image
              alt="logo"
              src="/borali-logo.png"
              height={110}
              width={250}
              className="mb-6 md:mb-8 self-start"
            />
            <h2 className="text-2xl md:text-3xl font-medium mb-3 md:mb-4">
              Cultura perto de você
            </h2>
            <p className="text-gray-200 text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        {/* Right side - Form container with animation */}
        <div className="w-full md:w-1/2 flex items-end justify-center px-6 pt-6 pb-0">
          <div className="w-full max-w-md">
            <Card className="shadow-xl rounded-2xl rounded-b-none overflow-hidden">
              <div
                className="relative"
                style={{
                  height: FORM_HEIGHT[activeStep],
                  transition: `height ${ANIMATION.DURATION_MS}ms ease`,
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeStep}
                    initial={{
                      x: direction === "left" ? 300 : -300,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                    }}
                    exit={{
                      x: direction === "left" ? -300 : 300,
                      opacity: 0,
                    }}
                    transition={{
                      duration: ANIMATION.DURATION_MS / 1000,
                      ease: "easeInOut",
                    }}
                    className="absolute top-0 left-0 w-full"
                  >
                    <CardContent className="p-6 md:p-8">
                      <CurrentAuthStep step={activeStep} goToStep={goToStep} />
                    </CardContent>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
