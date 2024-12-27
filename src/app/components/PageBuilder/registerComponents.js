import getCssContent from "@/app/utils/getCssContent";
import TwoColumnSection from "./TwoColumnSection";

const registerComponents = (editor) => {
  // Get the CSS content
  let cssContent = "";
  if (typeof window === "undefined") {
    cssContent = getCssContent();
  }

  // Function to inject styles into a frame
  const injectStyles = (frame) => {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = cssContent;
    frame.head.appendChild(styleEl);
  };

  // Inject styles when a new frame is added
  editor.on("frame:create", (frame) => {
    injectStyles(frame);
  });

  editor.BlockManager.add("two-column-section", {
    label: "Two Column Section",
    content: '<div data-gjs-type="two-column-section"></div>',
    category: "Sections",
  });

  editor.DomComponents.addType("two-column-section", {
    model: {
      defaults: {
        tagName: "div",
        attributes: { "data-gjs-type": "two-column-section" },
        traits: [
          // ... (keep existing traits)
        ],
        components: [
          {
            tagName: "div",
            attributes: { class: "flex flex-col md:flex-row" }, // Add this wrapper
            components: [
              {
                tagName: "div",
                components: [
                  {
                    tagName: "img",
                    type: "image",
                    attributes: {
                      class: "w-full h-full object-cover",
                      src: "https://picsum.photos/500.webp",
                    },
                  },
                ],
                attributes: { class: "w-full md:w-1/2" },
              },
              {
                tagName: "div",
                components: [
                  {
                    tagName: "h2",
                    type: "text",
                    content: "Heading",
                    attributes: { class: "text-2xl font-bold mb-4" },
                  },
                  {
                    tagName: "p",
                    type: "text",
                    content: "Paragraph text goes here.",
                    attributes: { class: "mb-4" },
                  },
                  {
                    tagName: "button",
                    type: "button",
                    content: "Call to Action",
                    attributes: {
                      class:
                        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
                    },
                  },
                ],
                attributes: { class: "w-full md:w-1/2 p-6" },
              },
            ],
          },
        ],
      },
      init() {
        this.on("change:src", this.updateImage);
      },
      updateImage() {
        const src = this.get("src");
        const image = this.components().models[0].components().models[0];
        image.set("src", src);
      },
    },
    view: {
      component: TwoColumnSection,
    },
  });
};

export default registerComponents;
