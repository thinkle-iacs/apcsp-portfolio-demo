# Adding a License to Your Portfolio

When creating a portfolio, it’s important to include a **license** that explains how others can use, share, or adapt your work. Adding a license helps protect your work while making it clear what others can (or cannot) do with it.

In this project, we recommend using a **Creative Commons** license. Creative Commons licenses are easy to understand and commonly used for sharing creative work, including code, websites, and other digital content. While software projects tend to use software licenses such as the [GNU Public License]() of the [MIT License](), content-based projects such as writing or artistic works are more typically licensed with Creative Commons licenses. What's more, the Creative Commons maintains a tool that makes it easy to decide what license you want to use and to generate HTML code to add to your page to license your work.

1. Go to the **[Creative Commons License Chooser](https://creativecommons.org/choose/)**.
2. Answer the questions to customize your license. You'll decide things like:
   - **Allowing modifications**: Can people change or adapt your work?
   - **Commercial use**: Can people use your work for commercial purposes?
3. Once you've answered the questions, the site will generate a license for you, including an HTML snippet you can embed directly on your website.

*Note: you don't **have** to use a Creative Commons License. If you would like to prevent others from copying your work in any form, you can simply write "All Rights Reserved" and include your name in date as a way of stating that you own the copyright for your own work and that you are not allowing others to use it.*

An example of an "All Rights Reserved" statement:


Example of an "All Rights Reserved" statement in HTML:

```html
<p>
  &copy; 2024 Your Name. 
  All Rights Reserved.
</p>
```

---

## Adding the License to Your Portfolio

Once you have generated your license, follow these steps:

1. **Copy the HTML code** provided by Creative Commons.
2. **Paste the code** into your `acknowledgments` or `footer` section of your website, or create a separate "License" page for it.
3. You should see something like this on your page:

   ```html
   <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
     <img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" />
   </a>
   <br>This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
   Creative Commons Attribution 4.0 International License</a>.