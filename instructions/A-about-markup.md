## About Markup

[Back to making your first change](./2-first-change.md)
| [Onto libraries!](./3-library-instructions.md)
| [To overview](../README.md)

### HTML and Astro

Webpages are written in a language called `html` which stands for "hypertext markup language." In this project, we are using a special
format called `astro` which is a special file format that *generates*
HTML while also allowing us to re-use code more easily.

Because HTML can be tedious to write and a lot of it is repetitive, the vast majority of websites use some kind of platform or system to
build HTML pages rather than writing HTML pages directly. This is part
of the DRY principle in coding: "Don't Repeat Yourself."

### HTML

HTML is actually one of *many* "markup languages", all of which use the
same basic *syntax* for creating tags. Other examples of file formats in
markup languages are `SVG` (a language for describing drawings) and `XML` (a language for describing anything). People use markup languages
for everything from tracking fitness data to laying out books.

The core idea of HTML is the `tag`. A `tag` begins with a left pointy bracket (`<`) and ends with a right pointy bracket (`>`). The *name*
of the tag comes immediately after the start tag.

Most tags are meant to "wrap" content (either text or other tags), so you usually will see an "open" tag followed by a "close" tag: the close
tag starts with a left pointy bracket followed by a slash (`/>`).

Here is an example of a complete tag:

```html
<h1>Hello World</h1>
```

In addition, tags can have `attributes`, which are similar to parameters in programming languages. These attributes provide *information* about the tag which can be used by scripts or the browser to change how a tag is displayed. An attribute looks a lot like a
variable statement in JavaScript, with the equal sign being used to
assign a value. Quotation marks are used to wrap the value of an
attribute (they are technically optional, but are necessary if the
value contains any spaces). 

Here are some examples of tags with attributes:


```html
<img src="https://placehold.co/200/200/" alt="A kitten">
```
*In an image, attributes provide the URL of the image file
 as well as alternate text to display if the image cannot
 be seen, either because there is a network failure or
 because the user is using a screen reader.*

```html
<a href="./projects/next/">Next project</a>
```
 The `<a>` (anchor) tag contains an href attribute, which provides the link to another page or resource. Here, it links to the “Next Project” page.


```html
<a data-tooltip="Click here to learn all about Harry Potter!"
   href="./projects/binary-search/">Binary Search Project</a>   
```
*Here, we are using special attributes to enable our picocss library
to show a popup*

```html
<div data-aos="fade-up">
  <h2>Scroll to Animate</h2>
  <p>This content will animate when scrolled into view.</p>
</div>
```
*Here, we are using special attributes to enable our AOS library
to add animations when an item scrolls into view*

---

## Common HTML Tags

Before we dive deeper into HTML, it's worth noting that laying out content in HTML is something that AI excels at. If you can describe the layout you're envisioning, an AI can often generate the correct and most commonly used syntax for you. However, it’s helpful to familiarize yourself with a few foundational HTML tags as you get started.

Here are some key HTML tags and what they do:

### Heading Tags
- **`<h1>` to `<h6>`**: These represent six levels of headings, with `<h1>` being the most important (usually used for main titles) and `<h6>` being the least important. Use headings to structure your content, from primary headings down to subheadings.

### Structural Tags
- **`<header>`**: Defines the header section of a webpage, often used for a logo, navigation, or introductory content.
- **`<footer>`**: Defines the footer section, typically containing copyright info, social media links, or contact details.
- **`<section>`**: Represents a generic section of a webpage. Use this to group content that belongs together, such as articles or parts of your page.
- **`<nav>`**: Represents a navigation section, often containing links to other pages or sections of the site.

### Content Tags
- **`<a>`**: Stands for "anchor" and is used to create a hyperlink (commonly referred to as a link) to another page or resource.
- **`<img>`**: Embeds an image into the page. It requires an `src` attribute, which provides the image’s URL, and an `alt` attribute for alternative text in case the image doesn’t load or is inaccessible.


### List Tags
- **`<ul>`**: Defines an unordered (bulleted) list. Each item in the list is wrapped in a `<li>` (list item) tag.
- **`<ol>`**: Defines an ordered (numbered) list. Like unordered lists, each item is wrapped in `<li>`.
- **`<li>`**: A list item within a list (`<ul>` or `<ol>`). This tag is used for each individual item in the list.

### Table Tags
- **`<table>`**: Defines a table in HTML. A table is made up of rows and columns.
- **`<tr>`**: Stands for "table row" and is used to define a row in a table.
- **`<td>`**: Stands for "table data" and is used to define individual cells in a row.
- **`<th>`**: Stands for "table header" and is used to define header cells, which are typically bolded or centered to distinguish them from regular data cells.


## CSS and Styles

If you take my web design class, we'll learn a *lot* about how to 
customize the look and feel of a webpage using CSS, which is a separate
language for styling webpages.

If you've already taken that class, you'll find a basic stylesheet in
`public/styles.css` that you can modify.

If you have *not* taken that class, I would begin by just using `picocss` which will automatically provide some basic styling for
your webpage, *or* if you don't like the look of picocss, you could
look at another design library such as `tailwind` or `bootstrap`. 
Usually these libraries will give you a set of `utility classes` you can
use so that you will style your page by adding classes onto tags
to change their appearance, like this:

### Pico Example

```html
<section class="container">
  <h1 class="text-center">Welcome to My Portfolio</h1>
  <p class="padding">This is an example paragraph with default padding applied.</p>
</section>
```

My [library tutorial](./3-library-instructions.md) will guide you through installing pico so those classes work.

### Bootstrap Example

Bootstrap is a very popular layout library. [Here are some examples of what it might look like in action](https://getbootstrap.com/docs/4.0/examples/)

Here is a simple code example:

```html
<div class="container text-center bg-primary text-white p-5">
  <h1>Welcome to My Portfolio</h1>
  <p class="mt-4 mb-2">This is an example paragraph with top and bottom margins.</p>
</div>
```

### Tailwind Example

Tailwind is another very popular library. Here are some examples

Here is a simple code example:

```html
<div class="container mx-auto text-center bg-blue-500 text-white p-6">
  <h1>Welcome to My Portfolio</h1>
  <p class="mt-8 mb-4">This is an example paragraph with margin above and below.</p>
</div>
```

[See more about libraries](./4-more-libraries.md) to learn how you could
install tailwind, bootstrap, or any other design library (there are *many*).

