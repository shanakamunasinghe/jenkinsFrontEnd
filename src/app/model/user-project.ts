import {User} from './user';
import {Project} from './project';

export class UserProject {
  id: number;
  user: User;
  project: Project;
  assignedUser: User;
}
