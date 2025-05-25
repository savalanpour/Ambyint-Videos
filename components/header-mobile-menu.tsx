"use client";

import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { MenuItem } from "./menu-item";
import LoginButton from "./login-button";

export const HeaderMobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden text-white">
      <MenuOutlined
        className="text-white text-2xl"
        onClick={() => setOpen(true)}
      />
      <Drawer
        title="Ambyint Videos"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        className="md:hidden bg-black"
        styles={{ body: { padding: 0, backgroundColor: "black" } }}
      >
        <div className="flex flex-col gap-6 p-6 text-white">
          <MenuItem link="/" name="Home" />
          <MenuItem link="/about-us" name="About Us" />
          <MenuItem link="/core-features" name="Core Features" />
          <MenuItem link="/contact-us" name="Contact Us" />
          <LoginButton />
        </div>
      </Drawer>
    </div>
  );
};
