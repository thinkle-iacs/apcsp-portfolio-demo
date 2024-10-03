# Getting Started: File Structure and Running in Debug Mode

## Project Structure Overview

Understanding the project structure is key to making changes effectively. Here’s a breakdown:

### `src/` Folder

- **Purpose**: Contains all your source code—the heart of your project.

### `src/pages/` Folder

- **Purpose**: Contains the source code for each page in your website.
- **Details**: Subfolders here will create subdirectories in your website.
  - Example: The `index.astro` file is the root page of your site.

### `src/components/` Folder

- **Purpose**: Contains reusable components that you can import into pages.
- **Details**: To start with, we have a Page component, which contains all the basic
  required HTML elements around your page and should be on every page. Then we also have
  a Project component with the idea that you'd have a template for each project you highlight
  on your portfolio.

  ### `src/styles/styles.css`

  This file is *imported* in your `main.js` file which is built with vite, a system which can bundle various libraries into your final
  website code.

  You can write CSS directly in this file if you learn some CSS for this
  project, or if libraries require you to add CSS import statements, you
  can add them to this file so your site will build correctly.

## Running the Project to Test It

You should be able to run your project by hitting "Launch Astro" from the Run and Debug side-panel.

If that fails, you can go to a terminal and run:

```sh
npm run dev
```

Note: this assumes you're in a Github Codespace and everything got installed correctly.
If not, try going to the terminal and running:

```sh
npm install
```
