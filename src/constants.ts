export const NETWORKTABLES_URI = "roboRIO-246-FRC.local";
export const NETWORKTABLES_PORT = undefined;

export const CAMERA_URI = "http://photonvision-front-left.local:1181/?action=stream"

export const NETWORKTABLES_PATHS = {
  AUTON_ROUTINE: {
    SELECTED:"/SmartDashboard/Auton Chooser/selected",
    OPTIONS: "/SmartDashboard/Auton Chooser/options",
  },
  STARTING_COLUMN: {
    SELECTED:"/SmartDashboard/Initial Position Chooser/selected",
    OPTIONS: "/SmartDashboard/Initial Position Chooser/options",
  },
  CROSSING_SIDE: {
    SELECTED:"/SmartDashboard/Crossing Position Chooser/selected",
    OPTIONS: "/SmartDashboard/Crossing Position Chooser/options",
  },
  ROW: {
    SELECTED:"/SmartDashboard/Row Selector/selected",
    OPTIONS: "/SmartDashboard/Row Selector/options",
  },
  SELECTED_NODE_X: "/SmartDashboard/Teleop Target Selector/Column Selected",
  SELECTED_NODE_Y: "/SmartDashboard/Teleop Target Selector/Row Selected",
} as const;