"use client";

import * as React from "react";

import styled from "@emotion/styled";
import * as ProgressPrimitive from "@radix-ui/react-progress";

const StyledRoot = styled(ProgressPrimitive.Root)`
  position: relative;
  height: 0.5rem;
  width: 100%;
  overflow: hidden;
  border-radius: 9999px;
  background: var(--muted);
  transform: translateZ(0);
`;

const StyledIndicator = styled(ProgressPrimitive.Indicator)`
  background: linear-gradient(90deg, #5cb85c, #84cc16);
  height: 100%;
  width: 100%;
  flex: 1;
  border-radius: 9999px;
  transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);
`;

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({ value, ...props }, ref) => {
  return (
    <StyledRoot ref={ref} {...props}>
      <StyledIndicator style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }} />
    </StyledRoot>
  );
});

Progress.displayName = "Progress";

export { Progress };
