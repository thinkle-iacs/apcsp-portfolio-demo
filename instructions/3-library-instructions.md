# Adding a Library: Installing Your First Library

Enhance your website by adding third-party libraries. Let's start by installing a simple style library called **PicoCSS** and an animate-on-scroll library called AOS (Animate-On-Scroll).

**PicoCSS** will automatically handle some basic
formatting for you and make it easy to have a clean, modern looking website without taking a whole web design class.

**AOS.js** is an example of a simple JavaScript library enhancement -- in this case, it makes it easy to make items fade in or animate in some way when
they first scroll onto the screen.

## Installing PicoCSS

### Step 1: Install PicoCSS via npm

Run the following command in your project directory:

```sh
npm install @picocss/pico
```

### Step 2: Import PicoCSS Globally

Open your `main.js` file located in the `scripts` directory and add the following import statement:

```js
import "@picocss/pico/css/pico.min.css";
```

### Step 3: Use PicoCSS in Your HTML

You can now use PicoCSS classes in your HTML files. For example, to center your content and set a reasonable width:

```html
<main class="container">
  <!-- Your content here -->
</main>
```

**Reference:** [PicoCSS Documentation](https://picocss.com/docs/container)

---

# Adding a Library: Installing Your First Library

Now let's install **AOS (Animate on Scroll)**, which adds animations to elements as they scroll into view. This library requires both a CSS import and a small JavaScript call to initialize.

## Installing AOS

### Step 1: Install AOS via npm

Run the following command in your project directory at the terminal:

```sh
npm install aos
```

### Step 2: Modify `main.js`

Open your `main.js` file in the `scripts` directory and modify it as follows.

(1) Underneath the comment `//Add imports here` add the imports
for the CSS and JS needed for AOS.

```js
import Aos from "aos";
import "aos/dist/aos.css";
```

(2) Underneath the comment `// Code that runs ONLY in the browser` add:
console.log("Hello world, from main.js!");

```js
Aos.init();
```

### Step 3: Use AOS in Your HTML

Now, you can add AOS to any HTML element by using the `data-aos` attribute.

For example, to make a heading fade in as it scrolls into view:

```html
<h1 data-aos="fade-in">Welcome to My Portfolio!</h1>
```

### Step 4: Customize Animation Settings (Optional)

You can also customize the animation duration and delay by adding extra attributes:

```html
<h1 data-aos="fade-in" data-aos-duration="1500" data-aos-delay="300">
  Welcome to My Portfolio!
</h1>
```

This example will make the heading fade in over 1.5 seconds with a 300ms delay.

**Reference:** [AOS Documentation](https://michalsnik.github.io/aos/)

---

Now your project is set up to use **AOS** for scroll-triggered animations! You’ve imported the required CSS and initialized the library using the `main.js` file with a conditional check to ensure it runs only in the browser.

- [Back to Making Your First Change](2-first-change.md)
- [Finding and Installing New Libraries](4-more-libraries.md)

---

[Back to Making Your First Change](2-first-change.md)
