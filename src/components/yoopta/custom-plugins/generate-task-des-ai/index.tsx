import { YooptaPlugin } from "@yoopta/editor";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GenerateTaskDesAIElement from "./render-component";

const GenerateTaskDesAIPlugin = new YooptaPlugin({
  type: "Divider",
  elements: {
    divider: {
      render: GenerateTaskDesAIElement,
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
      description: "Generate description with AI",
      icon: <AutoAwesomeIcon />,
    },
  },
});

export default GenerateTaskDesAIPlugin;
