export interface Task {
  id: string;
  text: string;
  isFadingOut?: boolean; // For delete animation
  isNew?: boolean; // For add animation
}
