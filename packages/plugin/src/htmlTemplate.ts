export const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
    <head>  
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>nanostory</title>
    </head>
    <body>
        <div id="root"></div>
        <script type="module" src="{{ entry }}"></script>
    </body>
</html>
`;
