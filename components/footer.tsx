import Image from "next/image";
import Link from "next/link";
import React from "react";

import { NewsletterForm } from "@/components/newsletter-form";
import LinkedInIcon from "@/components/icon-components/linkedIn-icon";
import TwitterIcon from "@/components/icon-components/twitter-icon";
import FacebookIcon from "@/components/icon-components/facebook-icon";

import Logo from "@/public/images/logo-white.png";

export const Footer = () => {
  return (
    <footer className="bg-black py-8 text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="mb-2 text-3xl font-semibold">
              Sign up to our newsletter
            </h2>
            <p className="mb-6 text-gray-400">
              Stay up to date with the latest news, announcement and articles
            </p>
          </div>
          <div>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex md:grid gap-8 md:grid-cols-4">
          <div className="flex-1 col-span-1">
            <Link href="/">
              <Image
                src={Logo}
                alt="Housing Comply Logo"
                width={100}
                height={30}
              />
            </Link>
            <div className="mt-6 flex gap-4">
              <Link
                href="https://twitter.com"
                className="text-gray-400 hover:text-orange-600"
              >
                <TwitterIcon className="h-6 w-6" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-gray-400 hover:text-orange-600"
              >
                <LinkedInIcon className="h-6 w-6" />
              </Link>
              <Link
                href="https://facebook.com"
                className="text-gray-400 hover:text-orange-600"
              >
                <FacebookIcon className="h-6 w-6" />
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-400">
              © {new Date().getFullYear()} Ambyint Videos
            </p>
          </div>

          <div className="col-span-3 mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about-us"
                    className="text-gray-400 hover:text-orange-600"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/contact-us"
                    className="text-gray-400 hover:text-orange-600"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="//terms-of-service"
                    className="text-gray-400 hover:text-orange-600"
                  >
                    Term of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-orange-600"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
