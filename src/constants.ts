export const NETWORKTABLES_URI = "10.2.46.2";
export const NETWORKTABLES_PORT = undefined;

export const CAMERA_URI = "http://10.2.46.2:1181/?action=stream"
export const CAMERA_RECONNECT_INTERVAL = 2000;

export const NETWORKTABLES_PATHS = {
  // AUTON_ROUTINE: {
  //   SELECTED:"/SmartDashboard/Auton Chooser/selected",
  //   OPTIONS: "/SmartDashboard/Auton Chooser/options",
  //   CONFIRMATION: "/SmartDashboard/Auton Chooser/active",
  // },
  // STARTING_COLUMN: {
  //   SELECTED:"/SmartDashboard/Initial Position Chooser/selected",
  //   OPTIONS: "/SmartDashboard/Initial Position Chooser/options",
  //   CONFIRMATION: "/SmartDashboard/Initial Position Chooser/active",
  // },
  // CROSSING_SIDE: {
  //   SELECTED:"/SmartDashboard/Crossing Position Chooser/selected",
  //   OPTIONS: "/SmartDashboard/Crossing Position Chooser/options",
  //   CONFIRMATION: "/SmartDashboard/Crossing Position Chooser/active",
  // }, 
  // SCORING_ROW: {
  //   SELECTED:"/SmartDashboard/Scoring Row Chooser/selected",
  //   OPTIONS: "/SmartDashboard/Scoring Row Chooser/options",
  //   CONFIRMATION: "/SmartDashboard/Scoring Row Chooser/active",
  // },
  // NUMBER_ELEMENTS: {
  //   SELECTED:"/SmartDashboard/Number of Elements Chooser/selected",
  //   OPTIONS: "/SmartDashboard/Number of Elements Chooser/options",
  //   CONFIRMATION: "/SmartDashboard/Number of Elements Chooser/active",
  // },

  CAN_PICK_UP: "/SmartDashboard/Can pickup",
  HAS_PIECE: "/SmartDashboard/Has Game Piece",
  GYRO_INITIALIZED: "/SmartDashboard/Gyro Initialized",

  // SELECTED_NODE_X: "/SmartDashboard/Teleop Target Selector/Column Selected",
  // SELECTED_NODE_Y: "/SmartDashboard/Teleop Target Selector/Row Selected",
} as const;