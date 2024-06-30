import { YooptaPlugin } from "@yoopta/editor";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssignPersonRenderElement from "./render-component";

const AssignPersonPlugin = new YooptaPlugin({
  type: "Divider",
  elements: {
    divider: {
      render: AssignPersonRenderElement,
      props: {
        nodeType: "void",
      },
      asRoot: true,
    },
  },
  events: {
    onClick: () => alert(true),
  },
  options: {
    shortcuts: ["/", "assign"],
    display: {
      title: "Assign person",
      description: "Assign person to this task",
      icon: <PersonAddIcon />,
    },
  },
});

export default AssignPersonPlugin;
