export interface Classroom {
  id: string;
  name: string;
  alternateLink: string;
  calendarId: string;
  courseGroupEmail: string;
  courseState: "ACTIVE" | "ARCHIVED" | "PROVISIONED" | "DECLINED";
  creationTime: string; 
  updateTime: string;   
  ownerId: string;
  teacherGroupEmail: string;
  guardiansEnabled: boolean;
  gradebookSettings: {
    calculationType: "TOTAL_POINTS" | "WEIGHTED_BY_CATEGORY" | string; 
    displaySetting: "SHOW_OVERALL_GRADE" | "HIDE_OVERALL_GRADE" | string;
  };
}