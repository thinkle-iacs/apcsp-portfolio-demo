### More About Components

In this tutorial, we’ll learn how to create your own component. This project came pre-built with
two components: one for the Page (`Page.astro`) and one for your project page (`Project.astro`).

---
#### Expanding Components

Now you probably noticed how we pass data into a component using properties, like:

`<Project title="My Title">`

If we want to add more properties to a component, we can -- we can access them in the component
file by expanding the list of properties we expect at the top of the file. So if we were to add
an image to the Project page, for example, we would need to do two things:

**Project.astro**

```astro
let { title, assignment, image } = Astro.props;
---

...
<img src="{image}">
...
```

**individual-project-page.astro**

```astro
<Project title="My Masterpiece" assignment="A cool assignment..." image="./images/foo.png">
</Project>
```

---

## Making a New Component

Any time you find yourself copy/pasting a lot of code, you probably should be thinking about creating a component.

Let's imaging that you decided you wanted a fancier list of projects on your landing page. On the template I gave you, there is a simple link for each project, but what if you wanted an image and a blurb layed out with the link in a fancy layout.

Let's assume you want all the projects to look the same for consistency: this is a perfect time to make a *new* component! For our example, we'll call it `NavItem`

### Step 1: Creating the "NavItem" Component

First, we’ll create a new reusable **NavItem** component. This component will be responsible for rendering each individual navigation item (like the Binary Search Project or APCSP Portfolio).

1. **Create a New Component File**

   Inside your `src/components/` folder, create a new file called `NavItem.astro`.

2. **Write the Component Code**

   Inside `NavItem.astro`, add the following code:

   ```astro
   ---
   const { title, link, imageSrc, blurb } = Astro.props;
   ---

   <li>
     <a href={link}>
       <img src={imageSrc} alt={title} style="width: 50px; height: 50px;" />
       <h3>{title}</h3>
       <p>{blurb}</p>
     </a>
   </li>
   ```

   - **Props**: We’re using `title`, `link`, `imageSrc`, and `blurb` as **props** in this component. These are like variables that we pass into the component to customize each nav item.
   - This is a basic structure: an image, a title, and a short description (blurb) for each project.

---

### Step 2: Refactor Your Navigation to Use the Component

Now that we’ve created the **NavItem** component, let’s update your existing `index.astro` file to use it.

1. **Open `src/pages/index.astro`**

   You should see some HTML for your navigation, like this:

   ```html
   <nav>
     <ul>
       <li>
         <a href="/projects/binary-search/"> Binary Search Project </a>
       </li>
       <li>
         <a href="/projects/portfolio/"> APCSP Portfolio </a>
       </li>
       <!-- More projects to come soon! -->
     </ul>
   </nav>
   ```

2. **Replace the `<li>` Elements with the NavItem Component**

   Let’s update this to use the new **NavItem** component you created. Replace the entire `<nav>` block with the following code:

   ```astro
   ---
   import NavItem from '../components/NavItem.astro';
   ---

   <nav>
     <ul>
       <NavItem
         title="Binary Search Project"
         link="/projects/binary-search/"
         imageSrc="/images/binary-search.png"
         blurb="Learn about the binary search algorithm and its implementation."
       />

       <NavItem
         title="APCSP Portfolio"
         link="/projects/portfolio/"
         imageSrc="/images/portfolio.png"
         blurb="A showcase of all my AP Computer Science Principles projects."
       />

       <!-- Add more projects here in the future -->
     </ul>
   </nav>
   ```

---

### Step 3: What You’ve Learned

- **DRY Principle**: Instead of repeating the same structure for every project in the navigation, you’ve created a reusable component that can be customized with different project details.
- **Props**: We’re passing values like `title`, `link`, `imageSrc`, and `blurb` into the component as **props**. This is a common pattern in web development to make components more flexible and reusable.
- **Components**: You’ve seen how components make it easier to structure and organize your code by reusing common elements.

---

