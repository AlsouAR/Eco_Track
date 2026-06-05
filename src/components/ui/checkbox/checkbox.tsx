"use client";

import * as React from "react";

import styled from "@emotion/styled";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

const StyledRoot = styled(CheckboxPrimitive.Root)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid var(--border);
  background-color: var(--input-background);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  outline: none;
  cursor: pointer;

  &[data-state="checked"] {
    background-color: var(--primary);
    border-color: var(--primary);
    color: var(--primary-foreground);
  }

  &:focus-visible {
    border-color: var(--primary);
    box-shadow:
      0 0 0 2px var(--background),
      0 0 0 4px var(--primary);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: var(--muted);
  }

  &[aria-invalid="true"] {
    border-color: var(--destructive);
    &:focus-visible {
      box-shadow:
        0 0 0 2px var(--background),
        0 0 0 4px var(--destructive);
    }
  }
`;

const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;

  svg {
    width: 0.875rem;
    height: 0.875rem;
    stroke-width: 3px;
  }
`;

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  className?: string;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <StyledRoot ref={ref} className={className} {...props}>
      <StyledIndicator>
        <CheckIcon />
      </StyledIndicator>
    </StyledRoot>
  )
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
