## Making Your First Change.

Let's assume you've already got the project running by following
the instructions in the [overview](./1-overview.md).

A good next step is making sure you know how to make an edit to the file and see it change.

Let's start with the first page of your website, which is in `src/pages/index.html`

Where it says:

```astro
<Page title="FIXME Portfolio">
```

Go ahead and change the word "FIXME" to your own first name, so it looks something like this:

```astro
<Page title="Ava's Portfolio">
```

Next up, go ahead and change the _h1_ tag to also show your new name:

```html
<h1>Ava's Portfolio</h1>
```

At this point, you should see the change reflected in the browser in two places: you'll see the bolded
words from the `<h1>` tag and then if you open the page in its own tab, you'll see the title you entered
in the tab.

To learn more about HTML, read my [About Markup](./A-about-markup.md) intro.

### About Astro Component's

`<Page title="Ava's Portfolio">` was your first use of a _component_, which is a way web programmers
speak about creating re-usable pieces of code. We use the _syntax_ of HTML which uses _attributes_ and _values_
with the structure `title="Ava's Portfolio"` as a way to pass data into a reusable component.

If you open `src/components/Page.astro` you can look for where the `title` property (like a variable) is
defined and you can look for where `{title}` is used in the source code. The bracket syntax is Astro's
way of allowing you to insert a property into a template: this is a common pattern in templating languages
and it's a way of allowing markup language designers to handle code reuse elgantly.

## Making Your First *Component* Change

Let's go ahead and open up `Page.astro` and try
making a change to our Page template.

At the bottom of the file, just above the `</body>`
close tag, we can add a new footer, like this:

```astro
<footer>
  Page by <b>My Name</b>, 
  last updated October, 2024.
  All rights reserved.
</footer>
```

Now if you look at your sample site, you'll notice
the footer will show up on *every* page that uses 
your `Page.astro` component. 

This is the power of components: it prevents you having
to repeat yourself! Any time you find yourself copy/pasting a lot of code from one page to another, you should
think about using a component instead.

Next up: [Adding your first library](./3-library-instructions.md)

Ready for more on components right away?
Jump to: [Creating your own component](./5-create-component.md)