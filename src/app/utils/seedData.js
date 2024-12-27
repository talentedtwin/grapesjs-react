const seedData = {
  id: "91e1b024-edb1-4cac-8d51-09fe96583ff1", // or any unique identifier
  name: "Home Page", // optional, for your reference
  data: {
    html: `<div class="wrapper">
      <h1>Welcome to My Website</h1>
      <p>This is a sample page created with GrapesJS.</p>
      <button class="button">Click me</button>
    </div>`,
    css: `
      .wrapper {
        padding: 50px;
        text-align: center;
      }
      h1 {
        color: #333;
        font-size: 24px;
      }
      .button {
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
      }
    `,
    components: [
      {
        type: "wrapper",
        components: [
          {
            type: "text",
            content: "Welcome to My Website",
          },
          {
            type: "text",
            content: "This is a sample page created with GrapesJS.",
          },
          {
            type: "button",
            content: "Click me",
            classes: ["button"],
          },
        ],
      },
    ],
    styles: [
      {
        selectors: [".wrapper"],
        style: {
          padding: "50px",
          "text-align": "center",
        },
      },
      {
        selectors: ["h1"],
        style: {
          color: "#333",
          "font-size": "24px",
        },
      },
      {
        selectors: [".button"],
        style: {
          "background-color": "#4CAF50",
          border: "none",
          color: "white",
          padding: "15px 32px",
          "text-align": "center",
          "text-decoration": "none",
          display: "inline-block",
          "font-size": "16px",
          margin: "4px 2px",
          cursor: "pointer",
        },
      },
    ],
    assets: [], // You can add any assets (images, etc.) here if needed
  },
};

export default seedData;
