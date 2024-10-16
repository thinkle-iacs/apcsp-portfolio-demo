import React from "react";
import { slide as Menu } from "react-burger-menu";
// From https://github.com/negomi/react-burger-menu

/* This is a boilerplate "react component" -- to include
React inside an Astro file, we need a standalone React component
we can import. This is a simple example that just provides
a menu. */

const Burger = () => {
  return (
    <Menu left>
      {/* We use data-theme="dark" to tell pico the menu is 
      in "dark mode" so it uses the right styles */}
      <ul data-theme="dark">
        {/* This is a list of links -- you can add more links here! */}
        <li>
          <a href="./projects/binary-search/">Binary Search Project</a>
        </li>
        <li>
          <a href="./projects/fix-me/">Second Example</a>
        </li>
        <li>
          <a href="./projects/fix-me-too/">Third Example</a>
        </li>
      </ul>
    </Menu>
  );
};

export default Burger;
