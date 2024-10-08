const projectDescription = `You are a software project manager. You need to write a project plan for the software project with the following brief description. The project plan must have a step by step breakdown of the project, including the tasks, resources, and timeline.`
// const projectDescription = "You are an automation tester. You need to write unit tests to coverage all cases for the following task. All unit tests codes must be written in j"
const taskDescription = `You are a software project manager. You need to write a task description for the following task that has a following description. The task description must have clear requirements, expected results, test cases` 
const projectTasks = `You are a software project manager. You need to list all features for the software project with the following brief description. Features should be grouped into two groups: backend, frontend. Backend features should include all needed entities's CRUD operator services. Frontend features should include details about each screens needed to implementent for this project.The result should be in JSON format. Keys in JSON should be lowercase.`

export const promptTemplate = {
    projectDescription,
    taskDescription,
    projectTasks
}