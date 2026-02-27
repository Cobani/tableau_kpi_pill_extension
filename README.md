# Tableau KPI Pill Extension

This is a simple Tableau Extension that displays a single Key Performance Indicator (KPI) as a visually appealing "pill" or "badge". The pill dynamically changes color based on the value of the measure (e.g., green for positive, red for negative).

![Demo](https://user-images.githubusercontent.com/12345/some-image-url.png) <!-- Replace with an actual screenshot -->

## Features

- **Dynamic Data:** Connects to a worksheet in your Tableau dashboard to display a measure.
- **Conditional Coloring:** Automatically colors the pill background and text based on whether the KPI is positive, negative, or neutral.
- **Easy Configuration:** A simple settings pane allows you to select the worksheet and the data field to display.
- **Responsive:** The pill is designed to fit well in various dashboard sizes.
- **Demo Mode:** If the extension is opened in a browser outside of Tableau, it will display a demo view.

## How to Use

1.  **Host the Extension:**
    - The files in this repository (especially `index.html`) need to be hosted on a web server that your Tableau instance can access. You can use services like GitHub Pages, Netlify, or your own web server.

2.  **Update the Manifest File:**
    - Open the `kpi-pill.trex` file in a text editor.
    - Find the `<source-location>` tag and change the `<url>` to the URL where you are hosting the `index.html` file.
    ```xml
    <source-location>
      <url>https://your-hosting-url/index.html</url>
    </source-location>
    ```

3.  **Add to Tableau:**
    - In your Tableau dashboard, drag an "Extension" object onto the canvas.
    - When prompted, choose "My Extensions".
    - Navigate to and select the `kpi-pill.trex` file you just edited.
    - The extension will load, and you will see the settings pane.

4.  **Configure the Pill:**
    - In the settings pane, select the worksheet that contains the data you want to visualize.
    - Select the field (measure) that you want to display as the KPI.
    - Click "Save & Apply". The pill will now display your selected data.

## Development

This extension is built with vanilla HTML, CSS, and JavaScript, using the [Tableau Extensions API](https://tableau.github.io/extensions-api/).

- `index.html`: Contains all the UI, styling, and JavaScript logic.
- `kpi-pill.trex`: The manifest file that tells Tableau about the extension.
- `GEMINI.md`: Provides context and guidelines for development with the Gemini CLI.

To make changes:

1.  Modify the HTML, CSS, or JavaScript in `index.html`.
2.  If you are running a local web server for development, you can point the `.trex` file to your local URL (e.g., `http://localhost:8080/index.html`). Make sure your Tableau instance can access this local address.
3.  Reload the extension in Tableau to see your changes.

## Author

- **Ilyas Coban**
- [ilyas.cbn@gmail.com](mailto:ilyas.cbn@gmail.com)

## License

This project is open-source. See the LICENSE file for details.
