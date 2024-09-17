import { YooptaPlugin } from "@yoopta/editor";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GenerateWithAIElement from "./render-component";

const GenerateContentAIPlugin = new YooptaPlugin({
  type: "Divider",
  elements: {
    divider: {
      render: GenerateWithAIElement,
      props: {
        nodeType: "void",
      },
      asRoot: true,
    },
  },
  events: {
  },
  options: {
    shortcuts: ["/", "ai"],
    display: {
      title: "Generate with AI",
      description: "Generate content with AI",
      icon: <AutoAwesomeIcon />,
    },
  },
});

export default GenerateContentAIPlugin;
