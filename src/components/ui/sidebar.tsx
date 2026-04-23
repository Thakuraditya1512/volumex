"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface SidebarContext {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContext | undefined>(undefined);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export function SidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const state = open ? "expanded" : "collapsed";

  return (
    <SidebarContext.Provider value={{ state, open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { collapsible?: "icon" | "none" }
>(({ className, collapsible = "icon", children, ...props }, ref) => {
  const { state } = useSidebar();

  return (
    <div
      ref={ref}
      data-state={state}
      className={cn(
        "group/sidebar relative flex h-screen flex-col transition-all duration-300",
        state === "expanded" ? "w-64" : "w-[60px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
Sidebar.displayName = "Sidebar";

export const SidebarHeader = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("flex flex-col", className)}>{children}</div>
);

export const SidebarContent = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("flex flex-1 flex-col overflow-y-auto scrollbar-hide", className)}>{children}</div>
);

export const SidebarFooter = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("flex flex-col", className)}>{children}</div>
);

export const SidebarGroup = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("flex flex-col p-2", className)}>{children}</div>
);

export const SidebarMenu = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <nav className={cn("flex flex-col gap-1", className)}>{children}</nav>
);

export const SidebarMenuItem = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("relative", className)}>{children}</div>
);

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    render?: React.ReactElement;
    tooltip?: string;
  }
>(({ className, asChild = false, render, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  if (render) {
    const Child = render;
    return (
      <div className={cn("flex w-full items-center", className)}>
        {React.cloneElement(Child, {
          className: cn(
            Child.props.className,
            "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-muted"
          ),
          ...props,
        })}
      </div>
    );
  }

  return (
    <Comp
      ref={ref}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-muted",
        className
      )}
      {...props}
    />
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";
