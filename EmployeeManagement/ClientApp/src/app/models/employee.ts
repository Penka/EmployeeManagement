import { Company } from "./company";
import { ExperienceLevel } from "./experienceLevel";

export class Employee {
    id: number;
    name: string;
    vacationDays: number;
    salary: number;
    startDate: any;
    company: Company;
    experienceLevel: ExperienceLevel;
  }