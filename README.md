# Getting Started with JavaScript for Complete Beginners

Welcome to the world of web development! If you're new to JavaScript, follow these steps to set up a basic project on your computer.

## Step 1: Install a Text Editor

Choose a code editor to write your HTML, CSS, and JavaScript code. A recommended choice is:

-   [Visual Studio Code (VSCode)](https://code.visualstudio.com/)

## Step 2: Install Git and GitHub CLI

Git is a version control system that helps you track changes in your code. Follow these steps to install Git:

1.  Download and install Git from [Git official website](https://git-scm.com/downloads).

2.  Verify the installation by running the following command in your terminal:

    ```sh
    git --version
    ```

    You should see the Git version printed in the terminal, confirming a successful installation.

GitHub CLI allows you to interact with GitHub from the command line. Follow these steps:

1.  Install GitHub CLI on macOS, Windows, or Linux. For more information, see [Installation](https://github.com/cli/cli#installation) in the GitHub CLI repository.

2.  Verify the installation by running the following command in your terminal:

    ```sh
    gh --version
    ```

    You should see the GitHub CLI version printed in the terminal, indicating a successful installation.

3.  Authenticate with GitHub by running this command from your terminal:

    ```sh
    gh auth login
    ```

4.  Follow the on-screen prompts.

    > GitHub CLI automatically stores your Git credentials for you when you choose HTTPS as your preferred protocol for Git operations and answer "yes" to the prompt asking if you would like to authenticate to Git with your GitHub credentials. This can be useful as it allows you to use git push, git pull, and so on, without needing to set up a separate credential manager or use SSH.

## Step 4: Write Your HTML Code

Open the file named `index.html` in the project root directory and write basic HTML:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your Web Page Title</title>
        <!-- Link to your CSS file (e.g., styles.css) -->
        <link rel="stylesheet" href="src/styles.css" />
    </head>
    <body>
        <!-- Your content goes here -->
        <script src="src/app.js"></script>
    </body>
</html>
```

## Step 5: Write Your JavaScript and CSS Code

`js` for JavaScript and `css` for CSS. Write your code in these files.

-   `main.js`:

    ```javascript
    // Your JavaScript code goes here
    console.log("Hello, World!");
    ```

-   `styles.css`:

    ```css
    /* Your CSS code goes here */
    body {
        font-family: "Arial", sans-serif;
        background-color: #f0f0f0;
    }
    ```

## Step 6: Run Your Frontend Project

Open the `index.html` file in your browser to view your web page.

Congratulations! You've set up a basic JavaScript project. Experiment with your HTML, CSS, and JavaScript code to build exciting web applications.
