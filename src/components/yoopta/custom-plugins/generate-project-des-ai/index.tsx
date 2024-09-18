import { YooptaPlugin } from "@yoopta/editor";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GeneratProjectDesWithAIElement from "./render-component";

const GenerateProjectDesAIPlugin = new YooptaPlugin({
  type: "Divider",
  elements: {
    divider: {
      render: GeneratProjectDesWithAIElement,
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

export default GenerateProjectDesAIPlugin;
