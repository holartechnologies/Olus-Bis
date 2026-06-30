"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SERVICES } from "@/lib/constants";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-[8%]">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#0B3AA8]">OLUS-BIS</span>
            <span className="text-[10px] font-medium tracking-wider text-[#F5B300] uppercase">
              Immigration Services
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {NAV_LINKS.map((link) =>
                link.label === "Services" ? (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-[#0B3AA8]">
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {SERVICES.map((service) => (
                          <li key={service.slug}>
                            <NavigationMenuLink>
                              <Link
                                href={`/services/${service.slug}`}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{service.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {service.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-gray-700 hover:text-[#0B3AA8] transition-colors px-3 py-2"
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${BRAND.phone}`}
            className="flex items-center gap-2 text-sm font-medium text-[#0B3AA8] hover:text-[#082A78]"
          >
            <Phone className="h-4 w-4" />
            {BRAND.phone}
          </a>
          <Button asChild className="bg-[#F5B300] text-[#1a1a2e] hover:bg-[#e8a800] font-semibold">
            <Link href="/contact">
              <Calendar className="mr-2 h-4 w-4" />
              Book Consultation
            </Link>
          </Button>
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="container mx-auto px-[8%] py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm font-medium text-gray-700 hover:text-[#0B3AA8]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t space-y-3">
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center gap-2 text-sm font-medium text-[#0B3AA8]"
              >
                <Phone className="h-4 w-4" />
                {BRAND.phone}
              </a>
              <Button asChild className="w-full bg-[#F5B300] text-[#1a1a2e] hover:bg-[#e8a800]">
                <Link href="/contact">Book Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
