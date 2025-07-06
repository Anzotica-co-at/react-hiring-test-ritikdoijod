import { ChevronRight, Earth, Menu, UserRound, X } from "lucide-react";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// Navigation links data
const navigationLinks = [
  {
    id: "hotels",
    label: "Hotels & Resorts",
    href: "#",
    submenu: [
      { id: "hotels-resorts", label: "Hotels & Resorts", href: "#" },
      { id: "new-hotels", label: "New Hotels", href: "#" },
      {
        id: "meetings-celebrations",
        label: "Meetings & Celebrations",
        href: "#",
      },
    ],
  },
  { id: "ritz-carlton-reserve", label: "Ritz Carlton Reserve", href: "#" },
  { id: "residences", label: "Residenses", href: "#" },
  { id: "yachts", label: "Yachts", href: "#" },
  {
    id: "about-ritz-carlton",
    label: "About The Ritz-Carlton",
    href: "#",
    submenu: [
      {
        id: "about-ritz-carlton-sub",
        label: "About The Ritz-Carlton",
        href: "#",
      },
      {
        id: "ritz-carlton-experience",
        label: "The Ritz-Carlton Experience",
        href: "#",
      },
    ],
  },
  {
    id: "the-journey",
    label: "The Journey",
    href: "#",
    submenu: [
      { id: "the-journey-sub", label: "The Journey", href: "#" },
      { id: "inspiration", label: "Inspiration", href: "#" },
      { id: "destination-guides", label: "Destination Guides", href: "#" },
      { id: "travel-interests", label: "Travel Interests", href: "#" },
    ],
  },
];

export function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="w-full bg-white md:shadow">
      <div className="flex h-16 w-full items-center justify-between gap-4 px-2 md:mx-auto md:h-20 md:w-[1040px] md:px-0">
        <div className="flex items-center gap-2">
          <Button
            className="group md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X /> : <Menu />}
          </Button>
          <a href="#" className="text-primary hover:text-primary/90 font-bold">
            LOGO
          </a>
        </div>
        <div className="flex items-center">
          <Button
            asChild
            variant="ghost"
            className="text-sm md:has-[>svg]:px-6"
          >
            <a href="#">
              <Earth />
              <span className="hidden md:block">English</span>
            </a>
          </Button>
          <Button asChild variant="ghost" size="sm" className="md:hidden">
            <a href="#">
              <UserRound className="md:hidden" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="hidden min-w-40 md:flex"
          >
            <a href="#">
              <span className="hidden text-xs md:block">Sign in or Join</span>
            </a>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="h-[calc(100vh-4rem)] md:hidden">
          <Accordion type="single" collapsible className="md:hidden">
            {navigationLinks.map(({ id, label, href, submenu }) =>
              submenu ? (
                <AccordionItem key={id} value={id} className="border-none">
                  <AccordionTrigger className="px-4 font-normal hover:no-underline">
                    {label}
                  </AccordionTrigger>
                  <AccordionContent className="bg-accent p-0">
                    <ul>
                      {submenu.map((item, index) => (
                        <li key={index}>
                          <a
                            href={item.href}
                            className="flex items-center justify-between p-4"
                          >
                            {item.label}
                            <ChevronRight className="text-muted-foreground size-4" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <a
                  href={href}
                  key={id}
                  className="block border-none p-4 text-sm font-normal"
                >
                  {label}
                </a>
              ),
            )}
          </Accordion>
          <div className="p-4">
            <Button size="lg" className="min-w-40 rounded-none">
              Reserve Now
            </Button>
          </div>
        </div>
      )}

      {/* Desktop menu */}
      <div className="hidden items-center justify-between md:mx-auto md:flex md:w-[1040px]">
        <NavigationMenu>
          {navigationLinks.map((link) => (
            <NavigationMenuItem key={link.id}>
              {link.submenu ? (
                <>
                  <NavigationMenuTrigger id={link.id}>
                    {link.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent id={link.id} className="w-sm">
                    <ul>
                      {link.submenu.map((item) => (
                        <li key={item.id}>
                          <a
                            href={item.href}
                            className="block px-8 py-6 text-sm hover:bg-blue-50 hover:underline"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <a
                  href={link.href}
                  className="text-primary/80 hover:border-b-primary block border-b-4 border-b-transparent py-7 text-xs font-medium uppercase transition-colors"
                >
                  {link.label}
                </a>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenu>

        <Button size="lg" className="my-2 flex min-w-40 rounded-none text-xs">
          Reserve Now
        </Button>
      </div>
    </header>
  );
}
